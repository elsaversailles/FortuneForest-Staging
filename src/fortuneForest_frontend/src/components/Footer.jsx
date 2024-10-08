import React from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';

const Footer = () => {
    const isTabletOrDesktop = useMediaQuery({ minWidth: 768 });

    return (
        <footer className="bg-[#75b957] text-white py-12">
            <div className="container mx-auto px-4">
                <div className={`grid ${isTabletOrDesktop ? 'grid-cols-3' : 'grid-cols-1'} gap-8`}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="text-2xl font-bold mb-4">FortuneForest</h3>
                        <p className="text-green-300">Play, Explore, and Reforest. Turn your game rewards into real-world trees!</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
                        <ul className={`${isTabletOrDesktop ? 'space-y-2' : 'flex flex-wrap justify-between'}`}>
                            <li className={isTabletOrDesktop ? '' : 'w-1/2 mb-2'}><a href="#" className="hover:text-green-300 transition-colors">Home</a></li>
                            <li className={isTabletOrDesktop ? '' : 'w-1/2 mb-2'}><a href="#" className="hover:text-green-300 transition-colors">About</a></li>
                            <li className={isTabletOrDesktop ? '' : 'w-1/2 mb-2'}><a href="#" className="hover:text-green-300 transition-colors">Play Now</a></li>
                            <li className={isTabletOrDesktop ? '' : 'w-1/2 mb-2'}><a href="#" className="hover:text-green-300 transition-colors">Contact</a></li>
                        </ul>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h4 className="text-xl font-semibold mb-4">Connect With Us</h4>
                        <div className={`flex ${isTabletOrDesktop ? 'space-x-4' : 'justify-between'}`}>
                            <a href="#" className="text-2xl hover:text-green-300 transition-colors"><FaTwitter /></a>
                            <a href="#" className="text-2xl hover:text-green-300 transition-colors"><FaFacebook /></a>
                            <a href="#" className="text-2xl hover:text-green-300 transition-colors"><FaInstagram /></a>
                            <a href="#" className="text-2xl hover:text-green-300 transition-colors"><FaGithub /></a>
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    className="mt-8 pt-8 border-t border-green-600 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <p>&copy; {new Date().getFullYear()} FortuneForest. All rights reserved.</p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;