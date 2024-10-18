import React, { useState } from 'react';
import { motion, useViewportScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Button } from "./ui/button";
import { useInView } from 'react-intersection-observer';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import { useMediaQuery } from 'react-responsive';
import GuestLayout from './layouts/GuestLayout';

const LandingPage = () => {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { scrollY } = useViewportScroll();

    const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
    const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const opacity = useTransform(scrollY, [0, 300, 500], [1, 0.5, 0]);

    const [missionRef, missionInView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    const [whyForestRef, whyForestInView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    return (
        <>
            <GuestLayout>
                <div className="min-h-screen overflow-hidden">
                    <main className="relative z-10">
                        <motion.section
                            className="h-screen flex flex-col items-center justify-between relative overflow-hidden"
                            style={{ opacity }}
                        >
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                                style={{ opacity }}
                            >
                                <source src="\videos\fortune-bg-video.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/30 to-green-900/70 z-10"></div>
                            <div className="relative z-20 w-full h-full flex flex-col items-center justify-between">
                                <div className="text-center mt-20 px-4">
                                    <motion.h1
                                        className={`mb-4 flex items-center justify-center flex-wrap ${isMobile ? 'text-4xl' : isTabletOrMobile ? 'text-6xl' : 'text-8xl'} font-inter tracking-tight`}
                                        initial={{ opacity: 0, y: -50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <motion.span
                                            className="font-extrabold text-green-400 mr-4 text-shadow-lg"
                                            initial={{ x: -100 }}
                                            animate={{ x: 0 }}
                                            transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
                                        >
                                            Welcome to
                                        </motion.span>
                                        <motion.span
                                            className="font-extrabold text-green-400 leading-tight relative text-shadow-lg"
                                            initial={{ x: 100 }}
                                            animate={{ x: 0 }}
                                            transition={{ delay: 0.4, type: 'spring', stiffness: 120 }}
                                        >
                                            <span className="relative">
                                                F<span className="relative inline-block">
                                                    <motion.span
                                                        className="absolute inset-0 flex items-center justify-center"
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                                    >
                                                        <svg className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'}`} viewBox="0 0 24 24">
                                                            <defs>
                                                                <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                                    <stop offset="0%" stopColor="#FFD700" />
                                                                    <stop offset="100%" stopColor="#FFA500" />
                                                                </linearGradient>
                                                            </defs>
                                                            <circle cx="12" cy="12" r="10" fill="url(#coinGradient)" stroke="#DAA520" strokeWidth="1" />
                                                            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#8B4513" fontSize="14" fontWeight="bold">$</text>
                                                        </svg>
                                                    </motion.span>
                                                    <span className="relative z-10 text-transparent">o</span>
                                                </span>rtuneF<span className="relative inline-block">
                                                    <motion.span
                                                        className="absolute inset-0 flex items-center justify-center"
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                                    >
                                                        <svg className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'}`} viewBox="0 0 24 24">
                                                            <circle cx="12" cy="12" r="10" fill="url(#coinGradient)" stroke="#DAA520" strokeWidth="1" />
                                                            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#8B4513" fontSize="14" fontWeight="bold">$</text>
                                                        </svg>
                                                    </motion.span>
                                                    <span className="relative z-10 text-transparent">o</span>
                                                </span>rest
                                            </span>
                                        </motion.span>
                                    </motion.h1>
                                    <motion.p
                                        className={`${isMobile ? 'text-lg' : 'text-xl'} text-green-100 max-w-2xl mx-auto mb-8 text-shadow`}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6, duration: 0.8 }}
                                    >
                                        Play, Explore, and Reforest. Turn your game rewards into real-world trees!
                                    </motion.p>
                                </div>
                                <motion.div className="w-full flex flex-col justify-center items-center overflow-hidden mb-8 relative">
                                    <motion.div
                                        className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl mx-auto"
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.4 }}
                                    >
                                        <div className="md:w-1/2 px-4 mb-8 md:mb-0">
                                            <motion.h2
                                                className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-green-200 mb-4 text-shadow-lg`}
                                                initial={{ opacity: 0, x: -50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.6, delay: 0.6 }}
                                            >
                                                Powered by Internet Computer
                                            </motion.h2>
                                            <motion.p
                                                className="text-lg text-green-100 mb-6 text-shadow"
                                                initial={{ opacity: 0, x: -50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.6, delay: 0.8 }}
                                            >
                                                FortuneForest leverages the power of ICP to create a seamless, decentralized gaming experience that directly impacts real-world reforestation efforts.
                                            </motion.p>
                                            <motion.div
                                                className="flex flex-wrap gap-4"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: 1 }}
                                            >
                                                <Button
                                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-lg"
                                                    onClick={() => setIsRegisterModalOpen(true)}
                                                >
                                                    Start Your Journey
                                                </Button>
                                                <Button
                                                    className="bg-transparent hover:bg-green-100 hover:text-green-800 text-green-100 font-semibold py-2 px-4 border border-green-300 rounded shadow-lg"
                                                    onClick={() => {/* Add action for learn more */ }}
                                                >
                                                    Explore ICP Technology
                                                </Button>
                                            </motion.div>
                                        </div>
                                        <motion.div
                                            className="md:w-1/2 px-4 relative"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.8, delay: 0.6 }}
                                        >
                                            <img
                                                src="laptop-mockup.png"
                                                alt="Laptop Mockup"
                                                className="w-full h-auto"
                                            />
                                            <motion.img
                                                src="icp-dfinitylogo.jpg"
                                                alt="ICP Dfinity Logo"
                                                className="rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-auto"
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 1, delay: 1.2 }}
                                            />
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.section>
                        <motion.section
                            className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 bg-cover bg-center bg-fixed"
                            style={{
                                backgroundImage: "url('bg-image-landing.jpg')",
                            }}
                        >
                            <div className="absolute inset-0 bg-black opacity-50"></div>

                            <motion.div
                                ref={missionRef}
                                className="relative z-10 text-center max-w-4xl mx-auto mb-20 pt-32"
                                initial={{ opacity: 0, y: 100 }}
                                animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                                transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
                            >
                                <motion.h1
                                    className={`${isMobile ? 'text-3xl' : isTabletOrMobile ? 'text-4xl' : 'text-5xl'} font-bold text-green-300 mb-8`}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={missionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                                >
                                    Mission
                                </motion.h1>
                                <motion.p
                                    className={`${isMobile ? 'text-lg' : 'text-xl'} text-green-100 mb-6`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                                >
                                    We will reclaim 50% of the Philippines' lost forests by 2030, transforming gamers into a global force of environmental change.
                                </motion.p>
                                <motion.p
                                    className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-green-200 mb-12`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                                >
                                    FortuneForest: Where virtual triumphs seed real-world forests.
                                </motion.p>
                                <motion.img
                                    src="mission-image.jpg"
                                    alt="FortuneForest Mission"
                                    className="w-full max-w-4xl rounded-lg shadow-2xl"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={missionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                    transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                                />
                            </motion.div>

                            <motion.div
                                ref={whyForestRef}
                                className="relative z-10 text-center max-w-6xl mx-auto pt-32 px-4"
                                initial={{ opacity: 0, y: 50 }}
                                animate={whyForestInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
                            >
                                <motion.h1
                                    className={`${isMobile ? 'text-3xl' : isTabletOrMobile ? 'text-4xl' : 'text-5xl'} font-bold text-green-300 mb-12 relative inline-block`}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={whyForestInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                                >
                                    Why Fortune Forest
                                    <motion.div
                                        className="absolute bottom-0 left-0 w-full h-1 bg-green-500"
                                        initial={{ width: 0 }}
                                        animate={whyForestInView ? { width: '100%' } : { width: 0 }}
                                        transition={{ delay: 0.6, duration: 1, ease: "easeInOut" }}
                                    />
                                </motion.h1>

                                <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} mb-16 relative`}>
                                    {!isMobile && (
                                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-green-500 transform -translate-y-1/2 z-0">
                                            <motion.div
                                                className="h-full bg-green-700"
                                                initial={{ width: 0 }}
                                                animate={whyForestInView ? { width: '100%' } : { width: 0 }}
                                                transition={{ delay: 0.2, duration: 1.5, ease: "easeInOut" }}
                                            />
                                        </div>
                                    )}
                                    {isMobile && (
                                        <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-green-500 transform -translate-x-1/2 z-0">
                                            <motion.div
                                                className="w-full bg-green-700"
                                                initial={{ height: 0 }}
                                                animate={whyForestInView ? { height: '100%' } : { height: 0 }}
                                                transition={{ delay: 0.2, duration: 1.5, ease: "easeInOut" }}
                                            />
                                        </div>
                                    )}
                                    {['sdg-15.png', 'ICP-logo.png', 'fortuneforest.png'].map((img, index) => (
                                        <motion.div
                                            key={index}
                                            className={`${isMobile ? 'w-full mb-12' : 'w-1/3'} px-4 z-10`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={whyForestInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                            transition={{ delay: 0.4 + index * 0.2, duration: 0.8, ease: "easeOut" }}
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`Fortune Forest Initiative ${index + 1}`}
                                                    className={`w-40 h-40 object-contain mx-auto mb-6 ${img === 'sdg-15.png' ? 'rounded-full' : ''} shadow-lg`}
                                                />
                                            </motion.div>
                                            <motion.h3
                                                className="text-xl font-semibold text-green-200 mb-2"
                                                initial={{ opacity: 0 }}
                                                animate={whyForestInView ? { opacity: 1 } : { opacity: 0 }}
                                                transition={{ delay: 0.6 + index * 0.2, duration: 0.8 }}
                                            >
                                                {index === 0 ? 'Sustainable Development' : index === 1 ? 'Powered by ICP' : 'FortuneForest Impact'}
                                            </motion.h3>
                                            <motion.p
                                                className="text-green-100"
                                                initial={{ opacity: 0 }}
                                                animate={whyForestInView ? { opacity: 1 } : { opacity: 0 }}
                                                transition={{ delay: 0.8 + index * 0.2, duration: 0.8 }}
                                            >
                                                {index === 0 ? 'Aligning with UN SDG 15: Life on Land' : index === 1 ? 'Leveraging blockchain technology' : 'Creating real-world impact'}
                                            </motion.p>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.p
                                    className={`${isMobile ? 'text-base' : 'text-lg'} text-green-100 max-w-3xl mx-auto leading-relaxed`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={whyForestInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                                >
                                    Fortune Forest is committed to restoring the ecological balance and biodiversity of the Philippines through large-scale reforestation initiatives. Our mission focuses on reviving forest ecosystems, protecting endangered species, and promoting sustainable land management practices that benefit both nature and local communities.
                                </motion.p>
                            </motion.div>

                        </motion.section>
                    </main>
                    <AnimatePresence>
                        {isRegisterModalOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                    duration: 0.4
                                }}
                            >
                                <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {isLoginModalOpen && (
                            <motion.div
                                initial={{ opacity: 0, rotateX: 90 }}
                                animate={{ opacity: 1, rotateX: 0 }}
                                exit={{ opacity: 0, rotateX: 90 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20,
                                    duration: 0.5
                                }}
                            >
                                <LoginModal
                                    isOpen={isLoginModalOpen}
                                    onClose={() => setIsLoginModalOpen(false)}
                                    onLoginSuccess={handleLoginSuccess}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </GuestLayout>
        </>
    );
};

export default LandingPage;