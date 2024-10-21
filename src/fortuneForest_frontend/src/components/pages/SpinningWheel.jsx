import React from 'react';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout';
import WheelComponent from '../SpinningWheelComponent';

const spinningwheel = ({ user }) => {
  return (
    <AuthenticatedLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-green-800 mb-6">Spinning Wheel</h1>
        <p className="text-lg text-green-700 mb-8">Welcome to the Spinning, {user.email}!</p>
        <WheelComponent user={user} />
      </div>
    </AuthenticatedLayout>
  );
};

export default spinningwheel;