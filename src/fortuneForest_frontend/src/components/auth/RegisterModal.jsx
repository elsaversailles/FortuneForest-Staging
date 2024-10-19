import React, { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { fortuneForest_backend } from 'declarations/fortuneForest_backend';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const RegisterModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password || !confirmPassword) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      toast({
        title: "Invalid Password",
        description: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords don't match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const result = await fortuneForest_backend.create_user(email, password);
      if (result) {
        toast({
          title: "Registration Successful",
          description: "Welcome to FortuneForest!",
          icon: '🌳',
        });
        onClose();
      } else {
        toast({
          title: "Registration Failed",
          description: "User with this email already exists",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Error",
        description: "An error occurred during registration",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <Card className="w-full max-w-md border-2 border-green-500">
        <CardHeader>
          <CardTitle className="flex items-center justify-center">
            <img src="/fortuneforest.jpg" alt="FortuneForest logo" className="w-10 h-10 mr-3 rounded-full" />
            <span>Create Account</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Welcome EcoGamer! Join and Help us to Reforest the environment
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                placeholder='m@example.com'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FiEyeOff className="h-5 w-5 text-gray-500" /> : <FiEye className="h-5 w-5 text-gray-500" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FiEyeOff className="h-5 w-5 text-gray-500" /> : <FiEye className="h-5 w-5 text-gray-500" />}
                </button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} onClick={handleRegister}>
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Registering...
              </>
            ) : (
              'Register'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterModal;