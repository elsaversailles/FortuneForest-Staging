import React from 'react';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout';
import MachineComponent from '../slotmachinecomponent';

const SlotMachine = ({ user }) => {
  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-green-800 mb-6">Woodland Wonders Slots</h1>
        <p className="text-lg text-green-700 mb-8">Welcome to the enchanted forest casino, {user.email}! Spin the reels and see what magical combinations you can create.</p>
        <MachineComponent user={user} />
      </div>
    </AuthenticatedLayout>
  );
};

export default SlotMachine;