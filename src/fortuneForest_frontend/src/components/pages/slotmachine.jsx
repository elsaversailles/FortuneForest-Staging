import React from 'react';
import AuthenticatedLayout from '../layouts/AuthenticatedLayout';
import MachineComponent from '../slotmachinecomponent';
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const SlotMachine = ({ user }) => {
  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('pages/slotmachine-bg.jpg')" }}>
        <div className="container mx-auto px-4 py-8 bg-black bg-opacity-70 rounded-lg shadow-lg text-center">
          <div className="flex flex-col md:flex-row items-start justify-center gap-4">
            <Card className="bg-green-800 bg-opacity-80 text-white md:w-1/4">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-yellow-300">Legend</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-left">
                  <li>🌴 3x Tree: 100 Tree Points</li>
                  <li>🥥 3x Coconut: 50 Tree Points</li>
                  <li>🌱 3x Seed: 25 Tree Points</li>
                  <li>🌿 3x Grass: 10 Tree Points</li>
                  <li>🎟️ 3x Voucher: Free Spin</li>
                </ul>
              </CardContent>
            </Card>
            <div className="md:w-3/4">
              <MachineComponent user={user} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default SlotMachine;
