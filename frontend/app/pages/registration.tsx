import { useState } from "react";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";

export default function RegistrationPage() {
  const [activeSide, setActiveSide] = useState("left");
  const [formData, setFormData] = useState({
    companyName: "",
    fullName: "",
    email: "",
    phone: "",
    businessType: "",
    employeesCount: "",
    industry: "",
    address: "",
    taxId: "",
    termsAccepted: false
  });

  const [errors, setErrors] = useState({
    companyName: "",
    fullName: "",
    email: "",
    businessType: "",
    employeesCount: "",
    industry: "",
    termsAccepted: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateCurrentSide = () => {
    let valid = true;
    const newErrors = {...errors};

    if (activeSide === "left") {
      if (!formData.companyName.trim()) {
        newErrors.companyName = "Company name is required";
        valid = false;
      }
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
        valid = false;
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
        valid = false;
      }
    } else {
      if (!formData.businessType) {
        newErrors.businessType = "Business type is required";
        valid = false;
      }
      if (!formData.employeesCount) {
        newErrors.employeesCount = "Employee count is required";
        valid = false;
      }
      if (!formData.industry) {
        newErrors.industry = "Industry is required";
        valid = false;
      }
      if (!formData.termsAccepted) {
        newErrors.termsAccepted = "You must accept the terms";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const handleNext = () => {
    if (validateCurrentSide()) {
      setActiveSide("right");
    }
  };

  const handleBack = () => {
    setActiveSide("left");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateCurrentSide()) {
      setIsSubmitting(true);
      // Handle form submission
      console.log("Form submitted:", formData);
      setTimeout(() => {
        setIsSubmitting(false);
        alert("Registration successful!");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-teal-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden p-5">
        {/* Header */}
        <div className="flex justify-center">
          <img src="./logo.png" alt="" className="w-50" />
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
            Create your ERP account
          </h2>

          {activeSide === "left" ? (
            /* Left Side - Basic Information */
            <div className="space-y-5">
              <div className="relative">
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 ${errors.companyName ? 'border-red-500' : 'border-gray-300'} appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                  placeholder=" "
                />
                <label htmlFor="companyName" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                  Company Name
                </label>
                {errors.companyName && (
                  <p className="mt-1 text-xs text-red-500">{errors.companyName}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 ${errors.fullName ? 'border-red-500' : 'border-gray-300'} appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                  placeholder=" "
                />
                <label htmlFor="fullName" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                  Your Full Name
                </label>
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 ${errors.email ? 'border-red-500' : 'border-gray-300'} appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                  placeholder=" "
                />
                <label htmlFor="email" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                  Email Address
                </label>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label htmlFor="phone" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                  Phone Number
                </label>
              </div>

              <button
                onClick={handleNext}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition"
              >
                Continue
              </button>
            </div>
          ) : (
            /* Right Side - Business Information */
            <div className="space-y-5">
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={handleBack}
                  className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  Back
                </button>
                <h3 className="text-sm font-medium text-gray-500">Business Information</h3>
                <div className="w-8"></div>
              </div>

              <div className="relative">
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 ${errors.businessType ? 'border-red-500' : 'border-gray-300'} appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                >
                  <option value="">Select Business Type</option>
                  <option value="sole_proprietor">Sole Proprietor</option>
                  <option value="llc">LLC</option>
                  <option value="corporation">Corporation</option>
                </select>
                <label htmlFor="businessType" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                  Business Type
                </label>
                {errors.businessType && (
                  <p className="mt-1 text-xs text-red-500">{errors.businessType}</p>
                )}
              </div>

              <div className="relative">
                <select
                  id="employeesCount"
                  name="employeesCount"
                  value={formData.employeesCount}
                  onChange={handleChange}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 ${errors.employeesCount ? 'border-red-500' : 'border-gray-300'} appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                >
                  <option value="">Number of Employees</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                </select>
                <label htmlFor="employeesCount" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                  Employees Count
                </label>
                {errors.employeesCount && (
                  <p className="mt-1 text-xs text-red-500">{errors.employeesCount}</p>
                )}
              </div>

              <div className="relative">
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 ${errors.industry ? 'border-red-500' : 'border-gray-300'} appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                >
                  <option value="">Select Industry</option>
                  <option value="retail">Retail</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="technology">Technology</option>
                </select>
                <label htmlFor="industry" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                  Industry
                </label>
                {errors.industry && (
                  <p className="mt-1 text-xs text-red-500">{errors.industry}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label htmlFor="address" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                  Business Address
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  id="taxId"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleChange}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label htmlFor="taxId" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1">
                  Tax ID (Optional)
                </label>
              </div>

              <div className={`py-3 ${errors.termsAccepted ? 'bg-red-50 rounded-lg px-3' : ''}`}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    className={`h-4 w-4 text-blue-600 rounded ${errors.termsAccepted ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                  </span>
                </label>
                {errors.termsAccepted && (
                  <p className="mt-1 text-xs text-red-500">{errors.termsAccepted}</p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition ${isSubmitting ? 'opacity-70' : ''}`}
              >
                {isSubmitting ? 'Creating account...' : 'Complete Registration'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}