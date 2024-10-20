import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/ui/border-beam";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FiCheck } from "react-icons/fi";

const RedeemPage = ({ user }) => {
    const redeemOptions = [
        { name: "Macbook Pro", cost: 98000, description: "Powerful laptop for professional use with cutting-edge technology", image: "/assets/macbook-pro.png" },
        { name: "Personalized Spiral", cost: 109.99, description: "Custom-made spiral notebook with your name or design", image: "/assets/spiral-notebook.png" },
        { name: "IPhone 15 Pro 2023", cost: 80569, description: "Latest iPhone model with advanced camera and performance features", image: "/assets/iphone15-pro.png" },
        { name: "Unisex Printed T-Shirt", cost: 359.99, description: "Comfortable and stylish t-shirt with unique printed designs", image: "/assets/unisex-tshirt.png" },
        { name: "Logitech G Pro X Wireless", cost: 4059.89, description: "High-performance wireless gaming headset for immersive audio", image: "/assets/logitech.png" },
        { name: "Flower Blossom Foundation", cost: 299, description: "Long-lasting makeup foundation for a flawless, natural look", image: "/assets/foundation.png" },
        { name: "Hanabishi Electric Kettle", cost: 756, description: "Efficient electric kettle for quick and easy hot water preparation", image: "/assets/electric-kettle.png" },
        { name: "Lenovo Premium Laptop", cost: 35000, description: "Sleek and powerful Lenovo laptop for work and entertainment", image: "/assets/lenovo-laptop.png" },
        { name: "Quanci Rainbow Pen", cost: 20, description: "Colorful and smooth-writing pen with multiple ink colors", image: "/assets/quanci-pen.png" },
        { name: "Maya Voucher", cost: 799, description: "Gift voucher for Maya online shopping platform", image: "/assets/maya-voucher.png" },
    ];

    return (
        <div className="container mx-auto px-20 py-20">
            <h1 className="text-4xl font-bold mb-6 text-green-700 text-center">Redeem Your Tree Points</h1>
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Welcome, {user.email}!</CardTitle>
                    <CardDescription>You have accumulated tree points to make a positive impact.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center">
                        <img src="/tree-points-icon.png" alt="Tree Points" className="w-8 h-8 mr-2" />
                        <p className="text-2xl font-semibold text-green-600">{user.tree_points} Tree Points Available</p>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {redeemOptions.map((option, index) => (
                    <Card key={index} className="flex flex-col relative overflow-hidden h-[450px] w-full">
                        <BorderBeam className="absolute inset-0 pointer-events-none" />
                        <img src={option.image} alt={option.name} className="w-full h-48 object-cover" />
                        <CardHeader className="p-4">
                            <CardTitle className="text-lg">{option.name}</CardTitle>
                            <CardDescription className="text-sm h-12 overflow-hidden">{option.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow p-4">
                            <Badge variant="secondary" className="text-sm flex items-center">
                                <img src="/tree-points-icon.png" alt="Tree Points" className="w-4 h-4 mr-1" />
                                {option.cost} Tree Points
                            </Badge>
                        </CardContent>
                        <CardFooter className="p-4">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="w-full bg-green-600 hover:bg-green-700">Redeem</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Confirm Redemption</DialogTitle>
                                        <DialogDescription>
                                            Review the details of your redemption below.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <img src={option.image} alt={option.name} className="col-span-4 w-full h-48 object-cover rounded-md" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <h3 className="col-span-4 text-lg font-semibold">{option.name}</h3>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <p className="col-span-4 text-sm text-gray-500">{option.description}</p>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Badge variant="secondary" className="col-span-4 text-sm flex items-center justify-center">
                                                <img src="/tree-points-icon.png" alt="Tree Points" className="w-4 h-4 mr-1" />
                                                {option.cost} Tree Points
                                            </Badge>
                                        </div>
                                    </div>
                                    {user.tree_points >= option.cost ? (
                                        <div className="flex items-center justify-center text-green-500 mb-4">
                                            <FiCheck className="mr-2" />
                                            You have enough Tree Points!
                                        </div>
                                    ) : (
                                        <div className="text-red-500 text-center mb-4">
                                            You don't have enough Tree Points. You need {option.cost - user.tree_points} more.
                                        </div>
                                    )}
                                    <Button
                                        onClick={() => {/* Handle redemption logic */ }}
                                        className="w-full bg-green-600 hover:bg-green-700"
                                        disabled={user.tree_points < option.cost}
                                    >
                                        Checkout
                                    </Button>
                                </DialogContent>
                            </Dialog>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default RedeemPage;