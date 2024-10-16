import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import LoadingPage from './LoadingPage';

const Header = ({ isAuthenticated, user: propUser }) => {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [user, setUser] = useState(propUser);
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        setIsLoading(true);
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('user');

        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    if (isLoading) {
        return <LoadingPage />;
    }

    const drawerVariants = {
        closed: { x: '100%' },
        open: { x: 0 },
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-green-600 shadow-lg shadow-[#5a9042]/30">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <img src="/fortuneforest.jpg" alt="FortuneForest logo" className="w-10 h-10 mr-3 rounded-full shadow-md border-2 border-white" />
                        <h1 className="text-3xl font-extrabold text-white tracking-tight font-['Bubblegum_Sans']">
                            <span className="text-green-300">F</span>ortune<span className="text-green-300">F</span>orest
                        </h1>
                    </div>
                    {isMobile ? (
                        <Button variant="ghost" onClick={toggleDrawer} className="text-white">
                            <FiMenu size={24} />
                        </Button>
                    ) : (
                        <nav className="flex items-center space-x-4">
                            {isAuthenticated && user ? (
                                <>
                                    <div className="flex space-x-4">
                                        <div className="flex items-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full px-3 py-1 shadow-md group hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                                            <div className="relative">
                                                <svg className="w-8 h-8 mr-2 transform group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24">
                                                    <defs>
                                                        <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                            <stop offset="0%" stopColor="#FFD700" />
                                                            <stop offset="100%" stopColor="#FFA500" />
                                                        </linearGradient>
                                                    </defs>
                                                    <circle cx="12" cy="12" r="10" fill="url(#coinGradient)" stroke="#DAA520" strokeWidth="1.5" />
                                                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#8B4513" fontSize="10" fontWeight="bold">$</text>
                                                </svg>
                                            </div>
                                            <div>
                                                <span className="block text-xs font-medium text-yellow-100">Life Coins</span>
                                                <span className="text-sm font-bold text-white group-hover:text-yellow-100 transition-colors duration-300">{user.life_coins}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full px-3 py-1 shadow-md group hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                                            <div className="relative">
                                                <div className="w-8 h-8 mr-2 rounded-full overflow-hidden border-2 border-white transform group-hover:rotate-12 transition-transform duration-300">
                                                    <img src="/tree-points-icon.png" alt="Tree" className="w-full h-full object-cover" />
                                                </div>
                                            </div>
                                            <div>
                                                <span className="block text-xs font-medium text-green-100">Tree Points</span>
                                                <span className="text-sm font-bold text-white group-hover:text-green-100 transition-colors duration-300">{user.tree_points}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" className="text-white hover:bg-green-700 transition-colors duration-300">Profile</Button>
                                    <Button
                                        variant="secondary"
                                        className="bg-white text-green-600 hover:bg-green-100 transition-all duration-300 shadow-md flex items-center"
                                        onClick={handleLogout}
                                    >
                                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                            <polyline points="16 17 21 12 16 7" />
                                            <line x1="21" y1="12" x2="9" y2="12" />
                                        </svg>
                                        <span className="font-semibold">Logout</span>
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="secondary" className="bg-white text-[#75b957] hover:bg-opacity-90 transition-all duration-300 shadow-md" onClick={() => setIsLoginModalOpen(true)}>
                                        Sign in
                                    </Button>
                                    <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#75b957] transition-all duration-300 shadow-md" onClick={() => setIsRegisterModalOpen(true)}>
                                        Sign Up
                                    </Button>
                                </>
                            )}
                        </nav>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isDrawerOpen && (
                    <motion.div
                        className="fixed top-0 right-0 bottom-0 w-64 bg-[#75b957] shadow-lg z-50 flex flex-col"
                        variants={drawerVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        <div className="p-4 flex flex-col h-full">
                            <Button
                                variant="ghost"
                                onClick={toggleDrawer}
                                className="self-end text-white hover:bg-green-600 transition-colors mb-8"
                            >
                                <FiX size={24} />
                            </Button>
                            <div className="space-y-6">
                                {isAuthenticated ? (
                                    <>
                                        <Button fullWidth variant="ghost" className="text-white hover:bg-green-600 transition-colors py-3 text-lg font-semibold">
                                            Dashboard
                                        </Button>
                                        <Button fullWidth variant="ghost" className="text-white hover:bg-green-600 transition-colors py-3 text-lg font-semibold">
                                            Profile
                                        </Button>
                                        <Button fullWidth variant="secondary" className="bg-white text-[#75b957] hover:bg-opacity-90 transition-all duration-300 shadow-md py-3 text-lg font-semibold" onClick={handleLogout}>
                                            <FiUser className="mr-2" /> Logout
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            fullWidth
                                            variant="secondary"
                                            className="bg-white text-[#75b957] hover:bg-opacity-90 transition-all duration-300 shadow-md py-3 text-lg font-semibold"
                                            onClick={() => { setIsLoginModalOpen(true); toggleDrawer(); }}
                                        >
                                            Sign in
                                        </Button>
                                        <Button
                                            fullWidth
                                            variant="outline"
                                            className="border-2 border-white text-white hover:bg-white hover:text-[#75b957] transition-all duration-300 shadow-md py-3 text-lg font-semibold"
                                            onClick={() => { setIsRegisterModalOpen(true); toggleDrawer(); }}
                                        >
                                            Sign Up
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </header>
    );
};

export default Header;