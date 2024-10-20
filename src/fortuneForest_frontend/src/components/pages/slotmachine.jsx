import React from 'react';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout';
import MachineComponent from '../slotmachinecomponent';

const SlotMachine = ({ user }) => {
  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{backgroundImage: "url('pages/slotmachine-bg.jpg')"}}>
        <div className="container mx-auto px-4 py-8 bg-black bg-opacity-70 rounded-lg shadow-lg text-center">
          <h1 className="text-4xl font-bold text-yellow-300 mb-4 font-inter tracking-wide">
            Enchanted Forest Slots
          </h1>
          <p className="text-lg text-green-100 mb-6 font-inter leading-relaxed max-w-2xl mx-auto">
            Welcome, brave adventurer <span className="font-semibold text-yellow-200">{user.email}</span>!
            Spin the magical reels and uncover the hidden treasures of the mystical woodland.
          </p>
          <MachineComponent user={user} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default SlotMachine;
