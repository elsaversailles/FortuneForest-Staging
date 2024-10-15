import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Dashboard = ({ user }) => {
    const svgIcons = [TreeSVG, CoinSVG, GamepadSVG, MedalSVG, LeafSVG, SeedlingSVG];
    const navigate = useNavigate();

    const handleGameRedirect = (game) => {
        switch (game) {
            case 'forest-slots':
                navigate('/slotmachine');
                break;
            // Add other game redirections here
            default:
                console.log('Game not implemented yet');
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="relative min-h-screen bg-gradient-to-br from-green-400 to-blue-500 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="flex animate-marquee-infinite">
                        {[...Array(40)].map((_, index) => (
                            <div key={index} className="flex items-center justify-center w-16 h-16 mx-4">
                                {React.createElement(svgIcons[index % svgIcons.length], { className: "w-8 h-8 text-white" })}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 p-8">
                    <motion.h1
                        className="text-5xl font-bold text-white mb-8 text-center mt-16"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Welcome to Your FortuneForest, {user.email}!
                    </motion.h1>

                    <motion.div
                        className="mt-8 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-xl border border-white border-opacity-20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-white">Quick Actions</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <ActionButton icon={TreeSVG} text="Plant a Tree" />
                            <ActionButton icon={GamepadSVG} text="Play Mini-Game" />
                            <ActionButton icon={CoinSVG} text="View Rewards" />
                            <ActionButton icon={LeafSVG} text="Eco Challenges" />
                        </div>
                    </motion.div>

                    <motion.div
                        className="mt-12 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-12 py-16 rounded-lg shadow-xl border border-white border-opacity-20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold mb-8 text-white text-center">Enchanted Forest Games</h2>
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            coverflowEffect={{
                                rotate: 50,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: true,
                            }}
                            pagination={true}
                            navigation={true}
                            modules={[EffectCoverflow, Pagination, Navigation]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <GameCard
                                    title="Leaf Color Symphony"
                                    description="Immerse yourself in a mesmerizing cascade of colorful leaves. Test your reflexes and color recognition skills as you match falling leaves to their corresponding targets. Each successful match grows your virtual forest and earns you valuable eco-points!"
                                    icon={LeafSVG}
                                    buttonText="Play Now"
                                    onButtonClick={() => handleGameRedirect('color-match')}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <GameCard
                                    title="Woodland Wonders Slots"
                                    description="Step into the magical forest casino! Spin the reels adorned with charming woodland creatures and mystical forest symbols. Match rare combinations to unlock hidden treasures and contribute to real-world reforestation efforts with every spin!"
                                    icon={GamepadSVG}
                                    buttonText="Try Your Luck"
                                    onButtonClick={() => handleGameRedirect('forest-slots')}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <GameCard
                                    title="Eco Destiny Wheel"
                                    description="Give the Wheel of Eco Destiny a whirl! Each spin presents a unique opportunity to win eco-friendly rewards, plant virtual trees, or contribute to global sustainability initiatives. Watch your positive impact grow with every turn!"
                                    icon={SeedlingSVG}
                                    buttonText="Spin the Wheel"
                                    onButtonClick={() => handleGameRedirect('eco-wheel')}
                                />
                            </SwiperSlide>
                        </Swiper>
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

const ActionButton = ({ icon: Icon, text }) => (
    <button className="flex flex-col items-center justify-center p-4 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors duration-300">
        <Icon className="w-6 h-6 text-white mb-2" />
        <span className="text-sm font-medium text-white">{text}</span>
    </button>
);

const GameCard = ({ title, description, icon: Icon, buttonText, onButtonClick }) => (
    <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-xl border border-white border-opacity-20 text-white h-full flex flex-col">
        <Icon className="w-16 h-16 mb-4 mx-auto text-green-300" />
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-sm mb-6 flex-grow">{description}</p>
        <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            onClick={onButtonClick}
        >
            {buttonText}
        </button>
    </div>
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
