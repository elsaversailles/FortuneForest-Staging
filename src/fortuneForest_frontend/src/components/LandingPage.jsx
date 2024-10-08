import React, { useState } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
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

    const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
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
                    <motion.div
                        className="fixed inset-0 bg-cover bg-center -z-10"
                        style={{
                            backgroundImage: "url('bg-image.webp')",
                            backgroundRepeat: 'repeat-y',
                            backgroundSize: 'cover',
                            backgroundAttachment: 'fixed',
                            opacity: 0.7,
                            transform: `translateY(${y1}px)`,
                        }}
                    ></motion.div>
                    <main className="relative z-10">
                        <motion.section
                            className="h-screen flex flex-col items-center justify-between"
                            style={{ opacity }}
                        >
                            <div className="text-center mt-20 px-4">
                                <motion.h1
                                    className={`mb-4 flex items-center justify-center flex-wrap ${isMobile ? 'text-4xl' : isTabletOrMobile ? 'text-6xl' : 'text-8xl'}`}
                                    initial={{ opacity: 0, y: -50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <motion.span
                                        className="font-['Bubblegum_Sans'] font-extrabold text-green-600 mr-4"
                                        initial={{ x: -100 }}
                                        animate={{ x: 0 }}
                                        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
                                    >
                                        Welcome to
                                    </motion.span>
                                    <motion.span
                                        className="font-extrabold text-green-800 font-['Bubblegum_Sans'] leading-tight relative"
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
                                    className={`${isMobile ? 'text-lg' : 'text-xl'} text-green-700 max-w-2xl mx-auto mb-8`}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                >
                                    Play, Explore, and Reforest. Turn your game rewards into real-world trees!
                                </motion.p>
                            </div>
                            <motion.div
                                className="w-full flex flex-col justify-center items-center overflow-hidden mb-8 relative"
                                style={{ y: y2 }}
                            >
                                <img
                                    src="tree.gif"
                                    alt="Growing tree"
                                    className={`h-auto ${isMobile ? 'max-h-[60vh]' : 'max-h-[80vh]'} w-auto max-w-[90%] object-contain`}
                                />
                            </motion.div>
                        </motion.section>
                        <section ref={missionRef} className="min-h-screen flex flex-col items-center justify-center py-20 px-4">
                            <motion.div
                                className="text-center max-w-4xl mx-auto"
                                initial={{ opacity: 0, y: 100 }}
                                animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                                transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
                            >
                                <motion.h1
                                    className={`${isMobile ? 'text-3xl' : isTabletOrMobile ? 'text-4xl' : 'text-5xl'} font-bold text-green-800 mb-8`}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={missionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                                >
                                    Mission
                                </motion.h1>
                                <motion.p
                                    className={`${isMobile ? 'text-lg' : 'text-xl'} text-green-700 mb-6`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                                >
                                    We will reclaim 50% of the Philippines' lost forests by 2030, transforming gamers into a global force of environmental change.
                                </motion.p>
                                <motion.p
                                    className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-green-800 mb-12`}
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
                        </section>
                        <section ref={whyForestRef} className="min-h-screen flex flex-col items-center justify-center py-20 px-4">
                            <motion.div
                                className="text-center max-w-6xl mx-auto"
                                initial={{ opacity: 0, y: 50 }}
                                animate={whyForestInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
                            >
                                <motion.h1
                                    className={`${isMobile ? 'text-3xl' : isTabletOrMobile ? 'text-4xl' : 'text-5xl'} font-bold text-green-800 mb-12`}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={whyForestInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                                >
                                    Why Fortune Forest
                                </motion.h1>

                                <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} mb-8 relative`}>
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
                                            className={`${isMobile ? 'w-full mb-8' : 'w-1/3'} px-4 z-10`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={whyForestInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                            transition={{ delay: 0.4 + index * 0.2, duration: 0.8, ease: "easeOut" }}
                                        >
                                            <img
                                                src={img}
                                                alt={`Fortune Forest Initiative ${index + 1}`}
                                                className={`w-32 h-32 object-contain mx-auto mb-4 ${img === 'sdg-15.png' ? 'rounded-full' : ''}`}
                                            />
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.p
                                    className={`${isMobile ? 'text-base' : 'text-lg'} text-green-700`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={whyForestInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                                >
                                    Fortune Forest is committed to restoring the ecological balance and biodiversity of the Philippines through large-scale reforestation initiatives. Our mission focuses on reviving forest ecosystems, protecting endangered species, and promoting sustainable land management practices that benefit both nature and local communities.
                                </motion.p>
                            </motion.div>
                        </section>
                    </main>
                    <RegisterModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} />
                    <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
                </div>
            </GuestLayout>
        </>
    );
};

export default LandingPage;