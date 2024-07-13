import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import VotingCard from '../../components/common/VotingCard'; 
import "../../styles/system.css";
import styles from './BetsComponent.module.css';
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import jsonData from '../../assets/data.json'; // Assuming your JSON data is in a file named data.json

const BetsPage: React.FC = () => {
  const [categories, setCategories] = useState<{ category: string; nominees: { id: number; movieTitle: string; name: string; }[]; }[]>([]);
  
  // Change the type of 'id' property in the 'Nominee' type to 'number'
  type Nominee = {
    id: number;
    movieTitle: string;
    name: string;
    img: string;
  };
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState<number>(() => {
    const savedIndex = localStorage.getItem('currentCategoryIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const [currentCategory, setCurrentCategory] = useState<{ category: string; nominees: Nominee[]; value: number } | undefined>();
  const [loaded, setLoaded] = useState(false);
  const [msg, setMsg] = useState('');

  const transformDataToCategories = (data: { id?: number, Category: string, Nominee: string, "Developer/Publisher": string }[]) => {
    const categoryMap: { [key: string]: { category: string, nominees: Nominee[]; } } = {};
  
    data.forEach((item) => {
      const categoryName = item.Category;
  
      if (!categoryMap[categoryName]) {
        categoryMap[categoryName] = {
          category: categoryName,
          nominees: []
        };
      }
      
      categoryMap[categoryName].nominees.push({
        id: item.id ? item.id : 0, // Use item.id directly instead of converting it to Number()
        movieTitle: item.Nominee,
        name: item["Developer/Publisher"],
        img: "" // Add the 'img' property with an empty string value
      });
    });
  
    return Object.values(categoryMap);
  };

  useEffect(() => {
    const transformedData = transformDataToCategories(jsonData);
    setCategories(transformedData);
    setCurrentCategory({...transformedData[currentCategoryIndex], value: 0}); // Assuming default value of 0 for 'value'
    setLoaded(true);
  }, []);

  const sendNominee = async (selectedNominee: number) => {
    if (selectedNominee === null) {
      setMsg("Please select a nominee.");
      return;
    }


    try {
      // Simulate API call for sending nominee
      // Replace with actual API call if needed
      // const response = await api.post("/bet", {
      //   nomineeId: selectedNominee,
      //   categoryId: category.category,
      // });

      // Simulated response handling
      // if (response.status === 201 || response.status === 200) {
      if (true) { // Simulated success condition
        setMsg("Nominee sent successfully.");
        window.location.href = "/bets"; // Redirect to bets page
      } else {
        setMsg("An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error sending nominee:", error);
      setMsg("An unexpected error occurred.");
    }
  };

  const navigateToNextCategory = () => {
    const nextIndex = currentCategoryIndex + 1 < categories.length ? currentCategoryIndex + 1 : 0;
    setCurrentCategoryIndex(nextIndex);
    setCurrentCategory({...categories[nextIndex], value: 0, nominees: categories[nextIndex].nominees.map(nominee => ({ ...nominee, img: "" }))});
    localStorage.setItem('currentCategoryIndex', nextIndex.toString());
  };

  const navigateToPreviousCategory = () => {
    const prevIndex = currentCategoryIndex - 1 >= 0 ? currentCategoryIndex - 1 : categories.length - 1;
    setCurrentCategoryIndex(prevIndex);
    setCurrentCategory({...categories[prevIndex], value: 0, nominees: categories[prevIndex].nominees.map(nominee => ({ ...nominee, img: "" }))});
    localStorage.setItem('currentCategoryIndex', prevIndex.toString());
  };

  return (
    <div className='system-body'>
      <Header />
      <Sidebar />
      <div className={styles.card}>
        <button onClick={navigateToPreviousCategory} className={styles.arrow}><GoArrowLeft /></button>
        {loaded && <VotingCard category={currentCategory as { category: string, nominees: { id: number; movieTitle: string; name: string; img: string;}[], value: number }} msg={msg} onClick={sendNominee} showBtn={true} />}
        <button onClick={navigateToNextCategory} className={styles.arrow}><GoArrowRight /></button>
      </div>
      <Footer />
    </div>
  );
};

export default BetsPage;
