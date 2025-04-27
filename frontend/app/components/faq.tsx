import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function FAQ() {
  const faqs = [
    { question: "Is the ERP customizable to my business needs?", answer: "Yes, our ERP system is highly flexible and can be tailored to match your workflows, processes, and industry-specific needs." },
    { question: "Can I integrate it with my existing tools?", answer: "Absolutely! We support integration with popular accounting, CRM, and inventory management software through APIs." },
    { question: "Is it available on mobile devices?", answer: "Yes, our ERP system is mobile-friendly and can be accessed via web apps on smartphones and tablets." },
    { question: "How secure is my data?", answer: "We use advanced encryption and cloud security practices to ensure your data is fully protected at all times." },
    { question: "What is the onboarding process like?", answer: "Our team assists you at every step — from setup, training to going live, making onboarding smooth and quick." },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-600">Got questions? We've got answers.</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b pb-4">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-800 focus:outline-none"
              >
                {faq.question}
                <span
                  className={`transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  {openIndex === index ? (
                    <FaChevronUp className="text-indigo-600" />
                  ) : (
                    <FaChevronDown className="text-indigo-600" />
                  )}
                </span>
              </button>

              {openIndex === index && (
                <p className="mt-3 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
