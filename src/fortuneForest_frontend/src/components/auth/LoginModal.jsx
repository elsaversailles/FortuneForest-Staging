import React, { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { fortuneForest_backend } from 'declarations/fortuneForest_backend';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../LoadingPage';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Email and password fields cannot be blank",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await fortuneForest_backend.verify_user_login_credentials(email, password);
      if (result.length > 0) {
        const user = JSON.parse(result[0]);
        const sessionToken = generateSessionToken();
        localStorage.setItem('sessionToken', sessionToken);
        localStorage.setItem('user', JSON.stringify(user));

        setIsLoadingPage(true);

        setTimeout(() => {
          if (typeof onLoginSuccess === 'function') {
            onLoginSuccess(user);
          }
          window.location.reload();
        }, 3000);

        toast({
          title: "Login Successful!",
          description: "Welcome to FortuneForest.",
          icon: '🌳',
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateSessionToken = () => {
    return Math.random().toString(36).substr(2) + Date.now().toString(36);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  if (isLoadingPage) {
    return <LoadingPage />;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <Card className="w-full max-w-md border-2 border-green-500">
        <CardHeader>
          <CardTitle className="flex items-center justify-center">
            <img src="/fortuneforest.jpg" alt="FortuneForest logo" className="w-10 h-10 mr-3 rounded-full" />
            <span>Login</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Play FortuneForest Now!
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
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
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} onClick={handleLogin}>
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginModal;