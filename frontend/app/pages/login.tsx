import { useState } from "react";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        username: "",
        password: "",
        credentials: "", // For incorrect username/password combo
        system: ""       // For system errors
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear relevant errors when user types
        setErrors({
            ...errors,
            [name]: "",
            credentials: "",
            system: ""
        });
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { 
            username: "", 
            password: "",
            credentials: "",
            system: ""
        };

        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        setErrors({
            ...errors,
            credentials: "",
            system: ""
        });

        try {
            // Replace with your actual API call
            const response = await mockLoginApi(formData.username, formData.password);
            
            if (response.success) {
                // Handle successful login (redirect, store token, etc.)
                alert("Login successful!");
            } else {
                setErrors({
                    ...errors,
                    credentials: "Incorrect username or password"
                });
            }
        } catch (error) {
            setErrors({
                ...errors,
                system: "Something went wrong. Please try again later."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Mock API function - replace with actual API call
    const mockLoginApi = (username, password) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate checking credentials
                const validCredentials = username === "demo" && password === "password123";
                resolve({
                    success: validCredentials,
                    message: validCredentials ? "Login successful" : "Invalid credentials"
                });
            }, 1000);
        });
    };

    return (
        <div className="h-screen flex items-center justify-center bg-green-100">
            <form onSubmit={handleSubmit} className="border border-gray-200 rounded-xl overflow-hidden px-5 py-5 w-full max-w-md bg-white shadow-2xl">
                <img src="./logo.png" alt="Auroni ERP" className="w-50 bg-gray-500 mx-auto" />
                <h1 className="mt-5 text-2xl text-gray-500 text-center">Sign in to continue</h1>
                
                {/* System Error Message */}
                {errors.system && (
                    <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                        {errors.system}
                    </div>
                )}
                
                {/* Username Field */}
                <div className="relative mt-5">
                    <input 
                        type="text" 
                        id="username" 
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 ${errors.username || errors.credentials ? 'border-red-500' : 'border-gray-300'} appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`} 
                        placeholder=" "
                    />
                    <label htmlFor="username" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                        Username
                    </label>
                    {errors.username && (
                        <p className="mt-1 text-xs text-red-500">{errors.username}</p>
                    )}
                </div>
                
                {/* Password Field */}
                <div className="relative mt-5">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 ${errors.password || errors.credentials ? 'border-red-500' : 'border-gray-300'} appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                        placeholder=" "
                    />
                    <label
                        htmlFor="password"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1"
                    >
                        Password
                    </label>
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <PiEyeLight size={18} /> : <PiEyeSlash size={18} />}
                    </button>
                    {errors.password && (
                        <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                    )}
                </div>
                
                {/* Credentials Error */}
                {errors.credentials && (
                    <div className="mt-2 text-sm text-red-500 text-center">
                        {errors.credentials}
                    </div>
                )}
                
                <a href="#" className="mt-4 block text-sm w-fit float-right rounded-full hover:bg-gray-100 px-3 py-1 text-blue-800">
                    Forget password?
                </a>
                
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`mt-8 block px-2.5 pb-2.5 pt-4 w-full text-sm text-white rounded-lg ${isSubmitting ? 'bg-teal-600' : 'bg-teal-500 hover:bg-teal-600'} transition-colors`}
                >
                    {isSubmitting ? 'Signing in...' : 'Sign in'}
                </button>
                
                <a href="#" className="mt-5 block text-sm w-fit mx-auto hover:bg-gray-100 px-3 py-1 rounded-full">
                    Create account
                </a>
            </form>
        </div>
    )
}