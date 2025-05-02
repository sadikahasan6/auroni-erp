import Footer from "~/components/footer";
import Header from "~/components/header";
import type { Route } from "./+types/news";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "News || Auroni ERP" },
    { name: "description", content: "Stay informed with the latest updates, features, and events from ERP Solutions. Explore our news to see how we're transforming business management." },
  ];
}

export default function News() {
  const newsArticles = [
    {
      title: "ERP Solutions Launches New Analytics Dashboard",
      summary:
        "Discover our latest feature: a powerful analytics dashboard that provides real-time insights to drive your business forward.",
      date: "April 15, 2025",
      link: "#",
    },
    {
      title: "Version 2.0 Release: Enhanced Workflow Customization",
      summary:
        "Our latest update introduces advanced workflow tools, making it easier to tailor the ERP to your unique business needs.",
      date: "March 20, 2025",
      link: "#",
    },
    {
      title: "Join Our Webinar: ERP for Small Businesses",
      summary:
        "Learn how our ERP system can help small businesses streamline operations in our upcoming webinar on May 10, 2025.",
      date: "March 5, 2025",
      link: "#",
    },
    {
      title: "New Integration with Popular CRM Platforms",
      summary:
        "Seamlessly connect your ERP with leading CRM tools to enhance customer relationship management.",
      date: "February 10, 2025",
      link: "#",
    },
  ];

  return (
    <>
      <Header />
      <section className="py-16 bg-gray-50">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Latest <span className="text-amber-950">News</span> & Updates
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest updates, features, and events from ERP
            Solutions. Explore our news to see how we're transforming business
            management.
          </p>
        </div>

        {/* News Cards */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border-t-4 border-amber-950 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{article.date}</p>
                <p className="mt-3 text-gray-600">{article.summary}</p>
                <a
                  href={article.link}
                  className="mt-4 inline-block text-amber-950 font-semibold hover:text-amber-900 transition-colors duration-200"
                >
                  Read More →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Want to Stay Updated?
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest news, feature updates,
            and exclusive offers from ERP Solutions.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a
              href="/contact"
              className="px-8 py-3 bg-amber-950 text-white font-semibold rounded-lg shadow-md hover:bg-amber-900 transition-colors duration-200"
            >
              Subscribe Now
            </a>
            <a
              href="/features"
              className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200"
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
