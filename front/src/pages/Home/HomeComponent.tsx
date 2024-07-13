import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import api from '../../libs/api';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import styles from './HomeComponent.module.css';
import "../../styles/system.css"

const HomePage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [available, setAvailable] = useState(false);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await api.get<{ username: string }>('/username');
        setUsername(response.data.username);
        setAvailable(true);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 401 || axiosError.response?.status === 400) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      }
    };

    const calculateCountdown = () => {
      const targetDate = new Date('2024-12-12 20:00:00 GMT-0300');
      const now = new Date();
      const timeDifference = targetDate.getTime() - now.getTime();

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setCountdown(`${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`);;
      } else {
        setCountdown('The Oscars are happening right now!');
      }
    };

    fetchUsername();
    calculateCountdown();

    const countdownInterval = setInterval(calculateCountdown, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  return (
    <div className='Home'>
      <Header />
      <div className={styles.messageContainer}>
        <div className={styles.countdownContainer}>
          <h2 className={styles.countdownTitle}>The Game Awards is happening in:</h2>
          <div className={styles.countdown}>{countdown}</div>
        </div>
        <div className={styles.textBox}>
          {available && <h2 className={styles.messageTitle}>Welcome, <span> {username} </span>!</h2>}
          <p className={styles.message}>You are now logged into the TGA Betting Pool. Feel free to make a <a href="/bets">Bet</a> or see the <a href="/winners">Winners</a> or <a href="/leaderboard">Leaderboard</a> if available!</p>
        </div>
      </div>
      <Sidebar />
      <Footer />
    </div>
  );
};

export default HomePage;