import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Footer from '~/components/footer';
import Header from '~/components/header';

export default function Documentation() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sections = [
    { id: 'getting-started', title: 'Getting Started' },
    { id: 'user-management', title: 'User Management' },
    { id: 'workflows', title: 'Custom Workflows' },
    { id: 'integrations', title: 'Integrations' },
    { id: 'analytics', title: 'Analytics & Reporting' },
    { id: 'security', title: 'Security Features' },
  ];

  return (
    <>
    <Header/>
    <section className="py-16 bg-gray-50">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          ERP <span className="text-amber-950">Documentation</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Explore our comprehensive documentation to get started, configure, and maximize the potential of your ERP system.
        </p>
      </div>

      {/* Main Content with Sidebar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="lg:hidden mb-4">
              <button
                onClick={toggleSidebar}
                className="flex items-center px-4 py-2 bg-amber-950 text-white rounded-lg hover:bg-amber-900"
              >
                {isSidebarOpen ? <FaTimes className="mr-2" /> : <FaBars className="mr-2" />}
                Menu
              </button>
            </div>
            <nav
              className={`lg:block ${isSidebarOpen ? 'block' : 'hidden'} bg-white p-6 rounded-lg shadow-md border-t-4 border-amber-950`}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Documentation</h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block text-gray-600 hover:text-amber-950 transition-colors duration-200"
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Content Area */}
          <div className="lg:w-3/4 bg-white p-8 rounded-lg shadow-md border-t-4 border-amber-950">
            <div id="getting-started" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
              <p className="text-gray-600">
                Welcome to ERP Solutions! This section guides you through the initial setup of your ERP system. Start by creating an account, configuring your organization, and inviting team members. Follow our step-by-step onboarding process to ensure a smooth setup.
              </p>
            </div>
            <div id="user-management" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Management</h2>
              <p className="text-gray-600">
                Manage users efficiently with our intuitive interface. Add, edit, or remove users, assign roles, and set permissions to control access to sensitive data and features.
              </p>
            </div>
            <div id="workflows" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Custom Workflows</h2>
              <p className="text-gray-600">
                Tailor workflows to match your business processes. Use our drag-and-drop editor to create custom workflows for tasks like order processing, inventory management, or approvals.
              </p>
            </div>
            <div id="integrations" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Integrations</h2>
              <p className="text-gray-600">
                Connect your ERP system with tools like CRM, accounting software, or e-commerce platforms. Our API documentation provides detailed instructions for seamless integrations.
              </p>
            </div>
            <div id="analytics" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics & Reporting</h2>
              <p className="text-gray-600">
                Leverage real-time analytics to monitor performance. Create custom reports, visualize data with dashboards, and make data-driven decisions.
              </p>
            </div>
            <div id="security" className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Security Features</h2>
              <p className="text-gray-600">
                Protect your data with advanced encryption, multi-factor authentication, and regular security audits. Learn how to configure security settings for maximum protection.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Need Help?</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Contact our support team for assistance or explore our features to see how our ERP system can transform your business.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="/contact"
            className="px-8 py-3 bg-amber-950 text-white font-semibold rounded-lg shadow-md hover:bg-amber-900 transition-colors duration-200"
          >
            Contact Support
          </a>
          <a
            href="/features"
            className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200"
          >
            View Features
          </a>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}