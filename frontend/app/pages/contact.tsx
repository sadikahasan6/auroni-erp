import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Footer from '~/components/footer';
import Header from '~/components/header';

export default function Contact() {
  return (
    <>
    <Header/>
    <section className="py-16 bg-gray-50">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Get in <span className="text-amber-950">Touch</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Have questions or need support? Contact our team to learn how our ERP solutions can transform your business.
        </p>
      </div>

      {/* Contact Form and Info */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-amber-950">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-950 focus:border-amber-950"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-950 focus:border-amber-950"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-950 focus:border-amber-950"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-amber-950 text-white font-semibold rounded-lg shadow-md hover:bg-amber-900 transition-colors duration-200"
              >
                Send Message
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-amber-950">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <ul className="space-y-4">
              <li className="flex items-center">
                <FaEnvelope className="text-amber-950 mr-3 text-xl" />
                <a
                  href="mailto:support@erpsolutions.com"
                  className="text-gray-600 hover:text-amber-950 transition-colors duration-200"
                >
                  support@erpsolutions.com
                </a>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-amber-950 mr-3 text-xl" />
                <a
                  href="tel:+1234567890"
                  className="text-gray-600 hover:text-amber-950 transition-colors duration-200"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-amber-950 mr-3 text-xl mt-1" />
                <span className="text-gray-600">123 Business Ave, Suite 100, Tech City</span>
              </li>
            </ul>
            {/* Map Placeholder */}
            <div className="mt-8">
              <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-600">
                  Map Placeholder (Add Google Maps embed here)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Ready to Start Your ERP Journey?
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our features or sign up for a free trial to experience the power of our ERP system.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <a
            href="/features"
            className="px-8 py-3 bg-amber-950 text-white font-semibold rounded-lg shadow-md hover:bg-amber-900 transition-colors duration-200"
          >
            View Features
          </a>
          <a
            href="/signup"
            className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200"
          >
            Start Free Trial
          </a>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}