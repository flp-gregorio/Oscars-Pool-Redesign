import { useEffect, useState } from "react";
import { PiMedalMilitaryFill } from "react-icons/pi";
import api from "../../libs/api";
import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";
import Footer from "../../components/layout/Footer";
import styles from "./LeaderboardComponent.module.css";
import "../../styles/system.css";

const LeaderboardPage = () => {
    const [leaderboard, setLeaderboard] = useState<any[]>([]);
    const [available, setAvailable] = useState(false);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                // Simulated data for placeholder
                const placeholderData = [
                    { username: "User1", points: 100, hits: 20 },
                    { username: "User2", points: 95, hits: 18 },
                    { username: "User3", points: 90, hits: 16 },
                    { username: "User4", points: 85, hits: 14 },
                    { username: "User5", points: 80, hits: 12 },
                    { username: "User6", points: 75, hits: 10 },
                    { username: "User7", points: 70, hits: 8 },
                    { username: "User8", points: 65, hits: 6 },
                    { username: "User9", points: 60, hits: 4 },
                    { username: "User10", points: 55, hits: 2 },
                    { username: "User11", points: 50, hits: 0 },
                ];

                // Simulate API call delay
                setTimeout(() => {
                    setLeaderboard(placeholderData);
                    setAvailable(true);
                }, 1000); // Adjust timeout as needed

            } catch (error) {
                console.error("Error fetching leaderboard:", error);
                // Handle error as needed
            }
        };

        fetchLeaderboard();
    }, []);

    return (
        <div className="system-body">
            <Header />
            <div className={styles.leaderboardContainer}>
                <h2 className={styles.leaderboardTitle}>Leaderboard</h2>
                <table className={styles.leaderboardTable}>
                    <thead>
                        <tr>
                            <th className={styles.pos}>Pos.</th>
                            <th className={styles.username}>Username</th>
                            <th className={styles.points}>Points</th>
                            <th className={styles.categories}>Categories</th>
                        </tr>
                    </thead>
                    <tbody>
                        {available && leaderboard.map((user: any, index) => (
                            <tr key={user.username}>
                                <td className={
                                    index === 0 ? styles.firstPlace :
                                    index === 1 ? styles.secondPlace :
                                    index === 2 ? styles.thirdPlace : ''
                                }>
                                    {index <= 2 ? <PiMedalMilitaryFill /> : index + 1}
                                </td>
                                <td className={styles.userUsername}>{user.username}</td>
                                <td>{user.points}</td>
                                <td>{user.hits}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Sidebar />
            <Footer />
        </div>
    );
}

export default LeaderboardPage;
