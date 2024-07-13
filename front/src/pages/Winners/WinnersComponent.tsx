import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import NomineesCard from '../../components/common/NomineesCard';
import "../../styles/system.css";
import styles from '../Bets/BetsComponent.module.css';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import jsonData from '../../assets/data.json'; // Assuming your JSON data is in a file named data.json
import api from '../../libs/api';
import { Nominee } from '../../types/Nominee';

const WinnersPage = () => {
  const [categories, setCategories] = useState<unknown[]>([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentCategory, setCurrentCategory] = useState<{ category: string; nominees: Nominee[]; value: number; } | null>({ category: '', nominees: [], value: 0 });
  const [msg, setMsg] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const transformDataToCategories = (data: { id?: Number, Category: string, Nominee: string, "Developer/Publisher": string }[]) => {
    const categoryMap: { [key: string]: { category: string, nominees: Nominee[] } } = {};
  
    data.forEach((item) => {
      const categoryName = item.Category;
  
      if (!categoryMap[categoryName]) {
        categoryMap[categoryName] = {
          category: categoryName,
          nominees: []
        };
      }
      
      categoryMap[categoryName].nominees.push({
        id: item.id || 0, // Set a default value for id if it is undefined
        movieTitle: item.Nominee,
        name: item["Developer/Publisher"]
      });
    });
  
    return Object.values(categoryMap);
  };
  

  useEffect(() => {
    const transformedData = transformDataToCategories(jsonData);
    setCategories(transformedData);
    setCurrentCategory({ ...transformedData[0], value: 0 });
    setIsAdmin(true); // Mock admin check
  }, []);

  const sendNominee = async (selectedNominee: null) => {
    if (selectedNominee === null) {
      setMsg("Please select a nominee.");
      return;
    }
  
    const category: { category: string, nominees: unknown[] } | null = currentCategory;
  
    try {
      const response = await api.post("/winner", {
        nomineeId: selectedNominee,
        categoryId: category?.category,
      });
  
      if (response.status === 201 || response.status === 200) {
        setMsg("Nominee sent successfully.");
        window.location.href = "/winners";
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
    setCurrentCategory(categories[nextIndex] as { category: string; nominees: Nominee[]; value: number; } | null);
    localStorage.setItem('currentCategoryIndex', nextIndex.toString());
  };

  const navigateToPreviousCategory = () => {
    const prevIndex = currentCategoryIndex - 1 >= 0 ? currentCategoryIndex - 1 : categories.length - 1;
    setCurrentCategoryIndex(prevIndex);
    setCurrentCategory(categories[prevIndex] as { category: string; nominees: Nominee[]; value: number; } | null);
    localStorage.setItem('currentCategoryIndex', prevIndex.toString());
  };

  return (
    <div className='system-body'>
      <Header />
      <Sidebar />
      <div className={styles.card}>
        <button onClick={navigateToPreviousCategory} className={styles.arrow}><FaArrowLeft /></button>
        {currentCategory && (
          <NomineesCard
            category={currentCategory}
            msg={msg}
            onClick={sendNominee}
            showBtn={isAdmin}
          />
        )}
        <button onClick={navigateToNextCategory} className={styles.arrow}><FaArrowRight /></button>
      </div>
      <Footer />
    </div>
  );
};

export default WinnersPage;
