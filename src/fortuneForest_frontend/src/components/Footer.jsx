import React from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
    const isTabletOrDesktop = useMediaQuery({ minWidth: 768 });

    return (
        <footer className="bg-green-600 text-white py-16">
            <div className="container mx-auto px-4">
                <div className={`grid ${isTabletOrDesktop ? 'grid-cols-4' : 'grid-cols-1'} gap-12`}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="col-span-2"
                    >
                        <h3 className="text-3xl font-bold mb-4">FortuneForest</h3>
                        <p className="text-green-100 mb-6">Play, Explore, and Reforest. Turn your game rewards into real-world trees!</p>
                        <div className="flex space-x-4">
                            <Button variant="outline" size="icon" className="hover:bg-green-500 text-green-100 hover:text-white">
                                <FaTwitter className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="hover:bg-green-500 text-green-100 hover:text-white">
                                <FaFacebook className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="hover:bg-green-500 text-green-100 hover:text-white">
                                <FaInstagram className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="hover:bg-green-500 text-green-100 hover:text-white">
                                <FaGithub className="h-4 w-4" />
                            </Button>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-green-300 transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-green-300 transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-green-300 transition-colors">Play Now</a></li>
                            <li><a href="#" className="hover:text-green-300 transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-green-300 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-green-300 transition-colors">Terms of Service</a></li>
                        </ul>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h4 className="text-xl font-semibold mb-4">Newsletter</h4>
                        <p className="mb-4">Stay updated with our latest news and offers.</p>
                        <div className="flex space-x-2">
                            <Input type="email" placeholder="Enter your email" className="bg-green-500 border-green-400 text-white placeholder-green-200" />
                            <Button className="bg-green-500 hover:bg-green-400 text-white">Subscribe</Button>
                        </div>
                    </motion.div>
                </div>
                <Separator className="my-8 bg-green-500" />
                <motion.div
                    className="text-center"
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
