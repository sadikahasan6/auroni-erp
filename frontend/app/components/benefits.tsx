import { FaClock, FaChartPie, FaExpandAlt, FaShieldAlt, FaCloud } from 'react-icons/fa';

export default function Benefits() {
  const benefits = [
    { icon: <FaClock size={28} className="text-indigo-600" />, title: 'Save Time', description: 'Automate repetitive tasks and speed up daily operations.' },
    { icon: <FaChartPie size={28} className="text-indigo-600" />, title: 'Real-Time Insights', description: 'Make faster, data-driven decisions with powerful reporting tools.' },
    { icon: <FaExpandAlt size={28} className="text-indigo-600" />, title: 'Scalability', description: 'Grow your business effortlessly without switching systems.' },
    { icon: <FaShieldAlt size={28} className="text-indigo-600" />, title: 'Security', description: 'Enterprise-grade security to protect your critical data.' },
    { icon: <FaCloud size={28} className="text-indigo-600" />, title: 'Cloud Access', description: 'Work from anywhere with secure cloud-based ERP solutions.' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">Why Choose Us</h2>
          <p className="mt-4 text-lg text-gray-600">Our ERP system is designed to deliver maximum value to your business.</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 border rounded-lg hover:shadow-lg transition duration-300">
              <div className="mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
