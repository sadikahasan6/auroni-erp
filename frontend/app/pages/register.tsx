// src/components/ERPRegister.tsx
import { useState, useEffect } from 'react';
import { PiEyeLight, PiEyeSlash, PiArrowRight, PiUserCircle, PiLock, PiShieldCheck, PiEnvelope, PiIdentificationCard, PiBuildings, PiPhone } from 'react-icons/pi';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  company: string;
  phone: string;
  termsAccepted: boolean;
}

interface FormErrors {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  company: string;
  phone: string;
  termsAccepted: string;
  system: string;
}

export default function ERPRegister() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    company: '',
    phone: '',
    termsAccepted: false
  });
  const [errors, setErrors] = useState<FormErrors>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    company: '',
    phone: '',
    termsAccepted: '',
    system: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
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

  const toggleConfirmPasswordVisibility = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error for the field being edited
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: '',
        system: ''
      });
    }
  };

  const validateStep = (step: number): boolean => {
    let valid = true;
    const newErrors: FormErrors = { 
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      company: '',
      phone: '',
      termsAccepted: '',
      system: ''
    };

    if (step === 1) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
        valid = false;
      }

      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
        valid = false;
      }

      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
        valid = false;
      }

      if (!formData.company.trim()) {
        newErrors.company = 'Company name is required';
        valid = false;
      }
    }

    if (step === 2) {
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
        valid = false;
      } else if (formData.username.length < 4) {
        newErrors.username = 'Username must be at least 4 characters';
        valid = false;
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
        valid = false;
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
        valid = false;
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
        valid = false;
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
        valid = false;
      }
    }

    if (step === 3 && !formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const nextStep = (): void => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = (): void => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!validateStep(3)) return;
    
    setIsSubmitting(true);

    try {
      const response = await mockRegisterApi(formData);
      
      if (response.success) {
        navigate('/registration-success');
      } else {
        setErrors({
          ...errors,
          system: response.message || 'Registration failed. Please try again.'
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

  const mockRegisterApi = (data: FormData): Promise<{success: boolean, message: string}> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Registration successful'
        });
      }, 1500);
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

      {/* Registration Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl relative z-10"
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
                Enterprise Portal Registration
              </h1>
              <p className="text-blue-100">
                Create your account to access the business platform
              </p>
            </motion.div>

            {/* Progress Steps */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <div className="flex justify-between items-center">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep > step 
                        ? 'bg-green-500' 
                        : currentStep === step 
                          ? 'bg-blue-500' 
                          : 'bg-white/20'
                    } text-white font-medium`}>
                      {step}
                    </div>
                    <span className="mt-2 text-xs text-blue-100">
                      {step === 1 ? 'Personal' : step === 2 ? 'Account' : 'Terms'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -z-10"></div>
                <motion.div 
                  className="absolute top-1/2 left-0 h-0.5 bg-blue-400 -z-10"
                  initial={{ width: '0%' }}
                  animate={{ 
                    width: currentStep === 1 ? '0%' : 
                           currentStep === 2 ? '50%' : '100%' 
                  }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </div>
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
              <AnimatePresence mode="wait">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* First Name */}
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-blue-100 mb-1">
                          First Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <PiUserCircle className="h-5 w-5 text-blue-300" />
                          </div>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`block w-full pl-10 pr-3 py-2 bg-white/10 text-white placeholder-blue-200 ${
                              errors.firstName
                                ? 'border-red-400 focus:ring-red-300/30' 
                                : 'border-blue-300/30 focus:ring-blue-300/30'
                            } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-blue-400 transition backdrop-blur-sm`}
                            placeholder="John"
                          />
                        </div>
                        {errors.firstName && (
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-1 text-sm text-red-300 flex items-center"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            {errors.firstName}
                          </motion.p>
                        )}
                      </div>

                      {/* Last Name */}
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-blue-100 mb-1">
                          Last Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <PiUserCircle className="h-5 w-5 text-blue-300" />
                          </div>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`block w-full pl-10 pr-3 py-2 bg-white/10 text-white placeholder-blue-200 ${
                              errors.lastName
                                ? 'border-red-400 focus:ring-red-300/30' 
                                : 'border-blue-300/30 focus:ring-blue-300/30'
                            } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-blue-400 transition backdrop-blur-sm`}
                            placeholder="Doe"
                          />
                        </div>
                        {errors.lastName && (
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-1 text-sm text-red-300 flex items-center"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            {errors.lastName}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <PiEnvelope className="h-5 w-5 text-blue-300" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-2 bg-white/10 text-white placeholder-blue-200 ${
                            errors.email
                              ? 'border-red-400 focus:ring-red-300/30' 
                              : 'border-blue-300/30 focus:ring-blue-300/30'
                          } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-blue-400 transition backdrop-blur-sm`}
                          placeholder="john.doe@company.com"
                        />
                      </div>
                      {errors.email && (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-1 text-sm text-red-300 flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          {errors.email}
                        </motion.p>
                      )}
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-blue-100 mb-1">
                        Company Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <PiBuildings className="h-5 w-5 text-blue-300" />
                        </div>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-2 bg-white/10 text-white placeholder-blue-200 ${
                            errors.company
                              ? 'border-red-400 focus:ring-red-300/30' 
                              : 'border-blue-300/30 focus:ring-blue-300/30'
                          } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-blue-400 transition backdrop-blur-sm`}
                          placeholder="Acme Inc."
                        />
                      </div>
                      {errors.company && (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-1 text-sm text-red-300 flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          {errors.company}
                        </motion.p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-blue-100 mb-1">
                        Phone Number (Optional)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <PiPhone className="h-5 w-5 text-blue-300" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-2 bg-white/10 text-white placeholder-blue-200 border border-blue-300/30 focus:ring-blue-300/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-blue-400 transition backdrop-blur-sm"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Account Information */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {/* Username */}
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-blue-100 mb-1">
                        Username
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <PiIdentificationCard className="h-5 w-5 text-blue-300" />
                        </div>
                        <input
                          type="text"
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-2 bg-white/10 text-white placeholder-blue-200 ${
                            errors.username
                              ? 'border-red-400 focus:ring-red-300/30' 
                              : 'border-blue-300/30 focus:ring-blue-300/30'
                          } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-blue-400 transition backdrop-blur-sm`}
                          placeholder="johndoe"
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
                    </div>

                    {/* Password */}
                    <div>
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
                            errors.password
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
                      <p className="mt-1 text-xs text-blue-200">
                        Password must be at least 8 characters long
                      </p>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-100 mb-1">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <PiLock className="h-5 w-5 text-blue-300" />
                        </div>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-10 py-2 bg-white/10 text-white placeholder-blue-200 ${
                            errors.confirmPassword
                              ? 'border-red-400 focus:ring-red-300/30' 
                              : 'border-blue-300/30 focus:ring-blue-300/30'
                          } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-blue-400 transition backdrop-blur-sm`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={toggleConfirmPasswordVisibility}
                          aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                          {showConfirmPassword ? (
                            <PiEyeSlash className="h-5 w-5 text-blue-300 hover:text-blue-100" />
                          ) : (
                            <PiEyeLight className="h-5 w-5 text-blue-300 hover:text-blue-100" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-1 text-sm text-red-300 flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          {errors.confirmPassword}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Terms and Conditions */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10 backdrop-blur-sm">
                      <h3 className="text-lg font-medium text-white mb-2">Terms and Conditions</h3>
                      <div className="text-blue-100 text-sm max-h-60 overflow-y-auto">
                        <p className="mb-3">
                          By creating an account, you agree to our Terms of Service and Privacy Policy. 
                          Please read them carefully before proceeding.
                        </p>
                        <h4 className="font-medium text-white mb-1">1. Account Responsibilities</h4>
                        <p className="mb-3">
                          You are responsible for maintaining the confidentiality of your account and password 
                          and for restricting access to your computer. You agree to accept responsibility 
                          for all activities that occur under your account or password.
                        </p>
                        <h4 className="font-medium text-white mb-1">2. Data Privacy</h4>
                        <p className="mb-3">
                          We collect personal data to provide and improve our services. Your data may be 
                          processed in accordance with our Privacy Policy. By using our services, you 
                          consent to such processing.
                        </p>
                        <h4 className="font-medium text-white mb-1">3. Service Usage</h4>
                        <p className="mb-3">
                          You agree to use our services only for lawful purposes and in accordance with 
                          these Terms. You must not use our services in any way that breaches any 
                          applicable local, national, or international law or regulation.
                        </p>
                        <h4 className="font-medium text-white mb-1">4. Intellectual Property</h4>
                        <p className="mb-3">
                          All content included on our platform, such as text, graphics, logos, and software, 
                          is the property of our company or its content suppliers and protected by 
                          international copyright laws.
                        </p>
                      </div>
                    </div>

                    {/* Terms Acceptance */}
                    <div className="mt-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="termsAccepted"
                            name="termsAccepted"
                            type="checkbox"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-400 focus:ring-blue-300 border-blue-300/50 rounded bg-white/10"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="termsAccepted" className="font-medium text-blue-100">
                            I agree to the Terms and Conditions and Privacy Policy
                          </label>
                        </div>
                      </div>
                      {errors.termsAccepted && (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-1 text-sm text-red-300 flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          {errors.termsAccepted}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-4">
                {currentStep > 1 ? (
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-blue-100 bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Back
                  </motion.button>
                ) : (
                  <div></div> // Empty div to maintain space
                )}

                {currentStep < 3 ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Next
                    <PiArrowRight className="ml-2 h-4 w-4" />
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full md:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
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
                          Processing...
                        </>
                      ) : (
                        <>
                          Complete Registration
                          <PiArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </span>
                  </motion.button>
                )}
              </div>
            </form>

            {/* Footer Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-center text-sm text-blue-200"
            >
              <p>
                Already have an account?{' '}
                <a href="/login" className="font-medium text-blue-300 hover:text-blue-100">
                  Sign in
                </a>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}