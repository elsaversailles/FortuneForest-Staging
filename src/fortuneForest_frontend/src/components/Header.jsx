import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import { useMediaQuery } from 'react-responsive';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import { useUserState } from '../hooks/useUserState';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"

const LifeCoinsDialog = ({ user }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex items-center bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full px-2 py-1 md:px-3 md:py-1 shadow-md group hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                    <div className="relative">
                        <svg className="w-6 h-6 md:w-8 md:h-8 mr-1 md:mr-2 transform group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24">
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
                        <span className="block text-xs md:text-sm font-medium text-yellow-100">Life Coins</span>
                        <span className="text-xs md:text-sm font-bold text-white group-hover:text-yellow-100 transition-colors duration-300">{user.life_coins}</span>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className={`${isMobile ? 'w-full' : 'sm:max-w-[800px] w-full'}`}>
                <DialogHeader>
                    <DialogTitle className="text-2xl md:text-3xl font-bold text-center">Buy Life Coins</DialogTitle>
                </DialogHeader>
                <div className="mt-4 md:mt-8">
                    <p className="text-lg md:text-xl mb-4 md:mb-6 text-center">Choose the amount of Life Coins you want to buy:</p>
                    <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4 md:gap-8`}>
                        {[
                            { amount: 100, image: '/resources/game-coin1.jpg' },
                            { amount: 500, image: '/resources/game-coin2.jpg' },
                            { amount: 1200, image: '/resources/game-coin3.jpg' },
                        ].map((option, index) => (
                            <div key={index} className="flex flex-col items-center p-4 md:p-6 border rounded-lg hover:shadow-lg transition-shadow">
                                <img src={option.image} alt={`${option.amount} Life Coins`} className="w-16 h-16 md:w-24 md:h-24 mb-2 md:mb-4 rounded-sm" />
                                <span className="font-bold text-xl md:text-2xl mb-1 md:mb-2">{option.amount} LC</span>
                                <Button className="w-full bg-green-500 hover:bg-green-600 text-white text-base md:text-lg py-1 md:py-2">
                                    Buy Now
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-4 md:mt-8">
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg md:text-xl py-2 md:py-3">
                        Bind Plug Wallet
                    </Button>
                </div>
                <div className="mt-2 md:mt-4 text-center text-xs md:text-sm text-gray-500">
                    By purchasing Life Coins, you agree to our Terms of Service and Privacy Policy.
                </div>
            </DialogContent>
        </Dialog>
    );
};

const Header = ({ isAuthenticated, user: propUser }) => {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [user, updateUser] = useUserState();
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const navigate = useNavigate();
    const randomNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan', 'Fiona', 'George', 'Hannah', 'Ian', 'Julia'];
    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];

    useEffect(() => {
        const handleStorageChange = () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                updateUser(JSON.parse(storedUser));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [updateUser]);

    const handleLogout = () => {
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('user');
        window.location.reload();
    };

    const CoinDisplay = ({ type, value, icon }) => (
        <div className={`flex items-center ${type === 'life' ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600' : 'bg-gradient-to-r from-green-400 via-green-500 to-green-600'} rounded-full px-3 py-1 shadow-md group hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
            <div className="relative">
                {icon}
            </div>
            <div>
                <span className="block text-xs font-medium text-white">{type === 'life' ? 'Life Coins' : 'Tree Points'}</span>
                <span className="text-sm font-bold text-white group-hover:text-yellow-100 transition-colors duration-300">{value}</span>
            </div>
        </div>
    );

    const UserMenu = () => (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent">
                        <Avatar className="w-10 h-10">
                            <AvatarImage
                                src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${randomName}`}
                                alt={user.email}
                            />
                            <AvatarFallback>{user.email.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink asChild>
                            <Link to="/redeem">
                                <Button variant="ghost" className="w-full text-left">
                                    Redeem
                                </Button>
                            </Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                            <Button variant="ghost" className="w-full text-left" onClick={handleLogout}>
                                <svg className="w-4 h-4 mr-2 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                                Logout
                            </Button>
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-green-600 shadow-lg shadow-[#5a9042]/30">
            <div className="container mx-auto px-4 py-2 md:px-6 md:py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        {isAuthenticated ? (
                            <Link to="/dashboard" className="flex items-center">
                                <img src="/fortuneforest.jpg" alt="FortuneForest logo" className="w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3 rounded-full shadow-md border-2 border-white" />
                                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-['Bubblegum_Sans']">
                                    <span className="text-green-300">F</span>ortune<span className="text-green-300">F</span>orest
                                </h1>
                            </Link>
                        ) : (
                            <>
                                <img src="/fortuneforest.jpg" alt="FortuneForest logo" className="w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3 rounded-full shadow-md border-2 border-white" />
                                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-['Bubblegum_Sans']">
                                    <span className="text-green-300">F</span>ortune<span className="text-green-300">F</span>orest
                                </h1>
                            </>
                        )}
                    </div>
                    {isAuthenticated && user ? (
                        <div className="flex items-center space-x-2 md:space-x-4">
                            <LifeCoinsDialog user={user} />
                            <CoinDisplay
                                type="tree"
                                value={user.tree_points}
                                icon={<img src="/tree-points-icon.png" alt="Tree" className="w-6 h-6 md:w-8 md:h-8 mr-2 rounded-full border-2 border-white" />}
                            />
                            {isMobile ? (
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="ghost" className="text-white p-1 md:p-2">
                                            <FiMenu size={24} />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent className="bg-green-600 text-white">
                                        <SheetHeader>
                                            <SheetTitle className="text-white">Menu</SheetTitle>
                                        </SheetHeader>
                                        <div className="space-y-4 mt-6">
                                            <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
                                            <Button variant="ghost" className="w-full justify-start">Redeem</Button>
                                            <Button variant="destructive" className="w-full" onClick={handleLogout}>
                                                <FiUser className="mr-2" /> Logout
                                            </Button>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            ) : (
                                <UserMenu />
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2 md:space-x-4">
                            <Button
                                variant="outline"
                                className="text-sm md:text-base bg-transparent border-green-500 text-white hover:bg-green-500 hover:text-black hover:border-black transition-colors duration-300"
                                onClick={() => setIsLoginModalOpen(true)}
                            >
                                Sign in
                            </Button>
                            <Button
                                variant="outline"
                                className="text-sm md:text-base bg-green-500 border-white text-black hover:bg-transparent hover:text-white hover:border-green-500 transition-colors duration-300"
                                onClick={() => setIsRegisterModalOpen(true)}
                            >
                                Sign Up
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </header>
    );
};

export default Header;