import React, { useState } from 'react';
import { Button } from "./ui/button";
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

    const drawerVariants = {
        closed: { x: '100%' },
        open: { x: 0 },
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#75b957] shadow-lg shadow-[#5a9042]/30">
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
                            <Button variant="secondary" className="bg-white text-[#75b957] hover:bg-opacity-90 transition-all duration-300 shadow-md" onClick={() => setIsLoginModalOpen(true)}>
                                Sign in
                            </Button>
                            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#75b957] transition-all duration-300 shadow-md" onClick={() => setIsRegisterModalOpen(true)}>
                                Sign Up
                            </Button>
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