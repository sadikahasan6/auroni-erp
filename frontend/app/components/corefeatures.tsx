import { FaMoneyBillWave, FaBoxes, FaChartLine, FaCogs, FaUsers } from 'react-icons/fa';

export default function CoreFeatures() {
  const features = [
    { icon: <FaMoneyBillWave size={30} className="text-teal-600" />, title: 'Finance Management', description: 'Automate accounting, budgeting, and financial reporting.' },
    { icon: <FaBoxes size={30} className="text-teal-600" />, title: 'Inventory Control', description: 'Real-time stock tracking, alerts, and optimization.' },
    { icon: <FaChartLine size={30} className="text-teal-600" />, title: 'Sales & CRM', description: 'Track leads, manage sales pipelines, and boost conversions.' },
    { icon: <FaCogs size={30} className="text-teal-600" />, title: 'Manufacturing', description: 'Streamline production planning and operations.' },
    { icon: <FaUsers size={30} className="text-teal-600" />, title: 'HR & Payroll', description: 'Manage employees, payroll, and performance evaluations.' },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">Core Features</h2>
          <p className="mt-4 text-lg text-gray-600">Everything you need to streamline your business operations.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300">
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
