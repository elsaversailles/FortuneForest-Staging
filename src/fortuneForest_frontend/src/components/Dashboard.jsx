import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = ({ user }) => {
    const svgIcons = [TreeSVG, CoinSVG, GamepadSVG, MedalSVG, LeafSVG, SeedlingSVG];
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ maxWidth: 768 });

    const handleGameRedirect = (game) => {
        switch (game) {
            case 'forest-slots':
                navigate('/slotmachine');
                break;
            case 'color-match':
                navigate('/color-match');
                break;
            case 'eco-wheel':
                navigate('/eco-wheel');
                break;
            default:
                console.log('Game not implemented yet');
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="relative min-h-screen bg-gradient-to-br from-green-400 to-blue-500 overflow-hidden px-4 sm:px-20 pb-20">
                <div className="absolute inset-0 opacity-10">
                    <div className="flex animate-marquee-infinite">
                        {[...Array(40)].map((_, index) => (
                            <div key={index} className="flex items-center justify-center w-16 h-16 mx-4">
                                {React.createElement(svgIcons[index % svgIcons.length], { className: "w-8 h-8 text-white" })}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 p-4 sm:p-8">
                    <div className="container mx-auto px-4 py-8">
                        <motion.div
                            className="flex flex-col sm:flex-row items-center justify-between bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-xl border border-white border-opacity-20"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.h1
                                className="text-3xl sm:text-5xl font-bold text-white mb-4 sm:mb-0 text-center sm:text-left"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                Welcome, {user.email}!
                            </motion.h1>
                            <div className="flex flex-wrap justify-center sm:justify-end space-x-2 sm:space-x-4">
                                <ActionButton icon={TreeSVG} text="Plant a Tree" />
                                <ActionButton icon={GamepadSVG} text="Play Mini-Game" />
                                <ActionButton icon={CoinSVG} text="View Rewards" />
                                <ActionButton icon={LeafSVG} text="Eco Challenges" />
                            </div>
                        </motion.div>
                    </div>
                    <motion.div
                        className="mt-12 bg-white p-6 sm:p-12 rounded-lg shadow-xl border border-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-gray-800 text-center">Enchanted Forest Games</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            <GameCard
                                title="Tree and Match"
                                description="Step into this magical game! Spin the reels adorned with charming woodland  and mystical forest symbols. Match rare combinations to win TreePoints!"
                                icon={GamepadSVG}
                                buttonText="Try Your Luck"
                                onButtonClick={() => handleGameRedirect('forest-slots')}
                            />
                            <GameCard
                                title="Rollete Up!"
                                description="Give the Wheel of Eco Destiny a whirl! Each spin presents a unique opportunity to win eco-friendly rewards, plant virtual trees, or contribute to global sustainability initiatives."
                                icon={SeedlingSVG}
                                buttonText="Spin the Wheel"
                                onButtonClick={() => handleGameRedirect('eco-wheel')}
                            />
                            <Card className="flex flex-col items-center justify-between p-6 space-y-4">
                                <CardHeader className="text-center">
                                    <Skeleton className="h-12 w-12 rounded-full" />
                                    <Skeleton className="h-4 w-3/4 mt-4" />
                                </CardHeader>
                                <CardContent className="text-center">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6 mt-2" />
                                    <Skeleton className="h-4 w-4/6 mt-2" />
                                </CardContent>
                                <CardFooter>
                                    <Skeleton className="h-10 w-32" />
                                </CardFooter>
                            </Card>
                        </div>
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

const ActionButton = ({ icon: Icon, text }) => (
    <button className="flex flex-col items-center justify-center p-4 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors duration-300 w-24 h-24 sm:w-auto sm:h-auto">
        <Icon className="w-6 h-6 text-white mb-2" />
        <span className="text-xs sm:text-sm font-medium text-white text-center">{text}</span>
    </button>
);

const GameCard = ({ title, description, icon: Icon, buttonText, onButtonClick }) => (
    <Card className="game-card h-full flex flex-col justify-between overflow-hidden">
        <CardHeader>
            <div className="h-32 sm:h-40 mb-4 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                <Icon className="w-16 h-16 sm:w-24 sm:h-24 text-green-500" />
            </div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-xs sm:text-sm text-center text-gray-600">{description}</p>
        </CardContent>
        <CardFooter>
            <Button
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-2 sm:py-3 px-4 rounded-full text-sm sm:text-base transition duration-300 ease-in-out hover:shadow-lg"
                onClick={onButtonClick}
            >
                {buttonText}
            </Button>
        </CardFooter>
    </Card>
);

const TreeSVG = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L4 8v12c0 1.1 0.9 2 2 2h12c1.1 0 2-0.9 2-2V8L12 2zm0 3.8L18 10v8H6v-8l6-4.2z" />
    </svg>
);

const CoinSVG = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">$</text>
    </svg>
);

const GamepadSVG = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 6H3c-1.1 0-2 0.9-2 2v8c0 1.1 0.9 2 2 2h18c1.1 0 2-0.9 2-2V8c0-1.1-0.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
);

const MedalSVG = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="9" r="6" />
        <path d="M12 15l-3 9h6l-3-9z" />
    </svg>
);

const LeafSVG = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.8 2.8C16 2.09 13.86 2 12 2c-1.86 0-4 .09-5.8.8C3.53 3.84 2 6.05 2 8.86V22h20V8.86c0-2.81-1.53-5.02-4.2-6.06zM12 3.88c1.55 0 3.15.16 4.5.47-1.24 1.23-3.04 2.15-4.5 2.31-1.46-.15-3.26-1.08-4.5-2.31 1.35-.31 2.95-.47 4.5-.47zM3.88 20v-9h4.59c.76 2.35 2.86 4.01 5.53 4.01s4.77-1.66 5.53-4.01h4.59v9H3.88z" />
    </svg>
);

const SeedlingSVG = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L4 8v12c0 1.1 0.9 2 2 2h12c1.1 0 2-0.9 2-2V8L12 2zm0 3.8L18 10v8H6v-8l6-4.2z" />
        <circle cx="12" cy="15" r="3" />
    </svg>
);

export default Dashboard;
