import React, { useState } from 'react';
import { Button } from "./ui/button";
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';

const Header = () => {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#75b957] shadow-lg shadow-[#5a9042]/30">
            <div className="container mx-auto px-6 py-4">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="flex items-center mb-4 sm:mb-0">
                        <img src="/fortuneforest.jpg" alt="FortuneForest logo" className="w-10 h-10 mr-3 rounded-full shadow-md border-2 border-white" />
                        <h1 className="text-3xl font-extrabold text-white tracking-tight font-['Bubblegum_Sans']">
                            <span className="text-green-300">F</span>ortune<span className="text-green-300">F</span>orest
                        </h1>
                    </div>
                    <nav className="flex items-center space-x-4">
                        <Button variant="secondary" className="bg-white text-[#75b957] hover:bg-opacity-90 transition-all duration-300 shadow-md" onClick={() => setIsLoginModalOpen(true)}>
                            Sign in
                        </Button>
                        <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#75b957] transition-all duration-300 shadow-md" onClick={() => setIsRegisterModalOpen(true)}>
                            Sign Up
                        </Button>
                    </nav>
                </div>
            </div>
            <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </header>
    );
};

export default Header;