import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import LoginPage from "../pages/Login/LoginComponent";
import RegisterPage from "../pages/Register/RegisterComponent";
import HomePage from "../pages/Home/HomeComponent";
import BetsPage from "../pages/Bets/BetsComponent";
import WinnersPage from "../pages/Winners/WinnersComponent";
import LeaderboardPage from "../pages/Leaderboard/LeaderboardComponent";
import UserPage from "../pages/User/UserComponent";
import NotFoundPage from "../pages/NotFound/NotFoundComponent";

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/home" element={<HomePage />} />    
                <Route path="/bets" element={<BetsPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />

                <Route path="/winners" element={
                    <PrivateRoute>
                        <WinnersPage />
                    </PrivateRoute>
                } />
                <Route path="/user" element={
                    <PrivateRoute>
                        <UserPage />
                    </PrivateRoute>
                } />

                {/* 404 */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;