// src/components/ERPLogin.tsx
import { useState, useEffect } from 'react';
import { PiEyeLight, PiEyeSlash, PiArrowRight, PiUserCircle, PiLock, PiShieldCheck } from 'react-icons/pi';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username: string;
  password: string;
  credentials: string;
  system: string;
}

export default function ERPLogin() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({
    username: '',
    password: '',
    credentials: '',
    system: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  // Floating particles effect
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speed: number}>>([]);

  useEffect(() => {
    // Create particles for background
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 2,
      speed: Math.random() * 0.5 + 0.2
    }));
    setParticles(newParticles);

    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        y: (p.y + p.speed) % 100,
        x: (p.x + p.speed * 0.3) % 100
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: '',
      credentials: '',
      system: ''
    });
  };

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors: FormErrors = { 
      username: '', 
      password: '',
      credentials: '',
      system: ''
    };

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setErrors({
      ...errors,
      credentials: '',
      system: ''
    });

    try {
      const response = await mockLoginApi(formData.username, formData.password);
      
      if (response.success) {
        navigate('/dashboard');
      } else {
        setErrors({
          ...errors,
          credentials: 'Incorrect username or password'
        });
      }
    } catch (error) {
      setErrors({
        ...errors,
        system: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const mockLoginApi = (username: string, password: string): Promise<{success: boolean, message: string}> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const validCredentials = username === 'demo' && password === 'password123';
        resolve({
          success: validCredentials,
          message: validCredentials ? 'Login successful' : 'Invalid credentials'
        });
      }, 1000);
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4 md:p-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-blue-400 opacity-20"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1 }}
          />
        ))}

        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute w-full h-px bg-white"
              style={{ top: `${i * 5}%` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ delay: i * 0.05, duration: 1 }}
            />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute h-full w-px bg-white"
              style={{ left: `${i * 5}%` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ delay: i * 0.05, duration: 1 }}
            />
          ))}
        </div>

        {/* Pulsing circles */}
        <motion.div
          className="absolute rounded-full bg-blue-500 opacity-10"
          style={{
            width: '50vw',
            height: '50vw',
            top: '-25%',
            left: '-25%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute rounded-full bg-blue-600 opacity-10"
          style={{
            width: '40vw',
            height: '40vw',
            bottom: '-20%',
            right: '-20%',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 5
          }}
        />
      </div>

      {/* Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20"
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <div className="p-6 sm:p-8">
            {/* Logo/Header */}
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <motion.div
                className="w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
                animate={{
                  rotate: [0, 10, -10, 0],
                  boxShadow: [
                    '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
                    '0 20px 25px -5px rgba(59, 130, 246, 0.4)',
                    '0 10px 15px -3px rgba(59, 130, 246, 0.3)'
                  ]
                }}
                transition={{
                  rotate: { duration: 5, repeat: Infinity },
                  boxShadow: { duration: 5, repeat: Infinity }
                }}
              >
                <PiShieldCheck className="w-10 h-10 text-white" />
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-6"
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Enterprise Portal
              </h1>
              <p className="text-blue-100">
                Sign in to access your business dashboard
              </p>
            </motion.div>

            {/* System Error */}
            <AnimatePresence>
              {errors.system && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-3 bg-red-400/20 text-red-100 text-sm rounded-lg flex items-center backdrop-blur-sm"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {errors.system}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="username" className="block text-sm font-medium text-blue-100 mb-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PiUserCircle className="h-5 w-5 text-blue-300" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-3 py-2 bg-white/10 text-white placeholder-blue-200 ${
                      errors.username || errors.credentials 
                        ? 'border-red-400 focus:ring-red-300/30' 
                        : 'border-blue-300/30 focus:ring-blue-300/30'
                    } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-blue-400 transition backdrop-blur-sm`}
                    placeholder="employee@company.com"
                  />
                </div>
                {errors.username && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-sm text-red-300 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {errors.username}
                  </motion.p>
                )}
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="password" className="block text-sm font-medium text-blue-100 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PiLock className="h-5 w-5 text-blue-300" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full pl-10 pr-10 py-2 bg-white/10 text-white placeholder-blue-200 ${
                      errors.password || errors.credentials 
                        ? 'border-red-400 focus:ring-red-300/30' 
                        : 'border-blue-300/30 focus:ring-blue-300/30'
                    } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-blue-400 transition backdrop-blur-sm`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <PiEyeSlash className="h-5 w-5 text-blue-300 hover:text-blue-100" />
                    ) : (
                      <PiEyeLight className="h-5 w-5 text-blue-300 hover:text-blue-100" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-sm text-red-300 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {errors.password}
                  </motion.p>
                )}
              </motion.div>

              {/* Credentials Error */}
              <AnimatePresence>
                {errors.credentials && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-red-400/20 text-red-100 text-sm rounded-lg flex items-center backdrop-blur-sm"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {errors.credentials}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Remember Me & Forgot Password */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-400 focus:ring-blue-300 border-blue-300/50 rounded bg-white/10"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-100">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-300 hover:text-blue-100">
                    Forgot password?
                  </a>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                    isSubmitting 
                      ? 'bg-blue-400' 
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all relative overflow-hidden`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting && (
                    <motion.div
                      className="absolute inset-0 bg-blue-400/30 backdrop-blur-sm"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in
                        <PiArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </span>
                </motion.button>
              </motion.div>
            </form>

            {/* Footer Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-center text-sm text-blue-200"
            >
              <p>
                Don't have an account?{' '}
                <a href="/register" className="font-medium text-blue-300 hover:text-blue-100">
                  Request access
                </a>
              </p>
              <p className="mt-2">
                <a href="#" className="hover:text-blue-100">
                  Need help signing in?
                </a>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}