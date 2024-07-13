import { useState } from "react";
import styles from "./VotingCard.module.css";
import { Category } from "../../types/Category";
import Button from "./Button";
import { Nominee } from "../../types/Nominee";

interface NomineesCardProps {
    category: Category;
    onClick: (selectedNominee: any) => void;
    showBtn: boolean;
    msg?: string;
}

const NomineesCard = (CardProps: NomineesCardProps) => {
    const [selectedNominee, setSelectedNominee] = useState<number | null>(null);
    const { category, onClick, showBtn, msg } = CardProps;

    const sendNominee = () => {
        onClick(selectedNominee);
        setSelectedNominee(null);
    };

    if (!Array.isArray(category.nominees)) {
        return <div>No nominees available</div>;
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.category}>{category.category}</h3>
            <div className={styles.nominees}>
                {category.nominees.map((nominee: Nominee) => (
                    <div key={String(nominee.id)} className={styles.nominee}>
                        <button
                            onClick={() => {setSelectedNominee(Number(nominee.id));}}
                            className={`${styles.nomineeButton} ${selectedNominee === nominee.id ? styles.selected : ""} ${nominee.userBet ? styles.userBet : ""} ${category.winner === nominee.id ? styles.winner : ""}`}>
                            <img src={nominee.img} alt="Nominee" onError={() => console.log(`Error loading image: ${nominee.img}`)} />
                        </button>
                    </div>
                ))}
            </div>
            <div className={styles.nomineeContent}>
                {selectedNominee && (
                    <p className={styles.nomineeMovie}>
                        {category.nominees.find(nominee => nominee.id === selectedNominee)?.movieTitle}
                    </p>
                )}
            </div>
            <div className={styles.send}>
                {showBtn && <Button onClick={sendNominee}>Confirm Nominee</Button>}
                <p>{msg}</p>
            </div>
        </div>
    );
};

export default NomineesCard;