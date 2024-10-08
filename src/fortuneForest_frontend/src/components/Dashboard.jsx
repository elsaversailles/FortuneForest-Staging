import React from 'react';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import { motion } from 'framer-motion';

const Dashboard = ({ user }) => {
    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <motion.h1 
                    className="text-4xl font-bold text-green-800 mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Welcome to Your FortuneForest Dashboard, {user.email}
                </motion.h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <motion.div 
                        className="bg-white p-6 rounded-lg shadow-md"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h2 className="text-2xl font-semibold mb-4">Your Forest</h2>
                        <p>Trees planted: 50</p>
                        <p>Forest health: 95%</p>
                    </motion.div>

                    <motion.div 
                        className="bg-white p-6 rounded-lg shadow-md"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
                        <p>Total achievements: 10</p>
                        <p>Latest: Master Planter</p>
                    </motion.div>

                    <motion.div 
                        className="bg-white p-6 rounded-lg shadow-md"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h2 className="text-2xl font-semibold mb-4">Eco Impact</h2>
                        <p>CO2 absorbed: 500 kg</p>
                        <p>Biodiversity increase: 25%</p>
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;
