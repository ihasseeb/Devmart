import HaseebImage from "../assets/1.png";

const About = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About DevMart</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Pakistan's most trusted online store — built with passion, delivered
            with care.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              DevMart was founded with a simple goal — to make online shopping
              easy, affordable, and reliable for everyone in Pakistan.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe everyone deserves access to quality products at the
              best prices, with fast delivery right to their doorstep.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <p className="text-4xl font-bold text-blue-600">10K+</p>
              <p className="text-gray-500 text-sm mt-1">Products</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <p className="text-4xl font-bold text-blue-600">50K+</p>
              <p className="text-gray-500 text-sm mt-1">Customers</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <p className="text-4xl font-bold text-blue-600">4.9⭐</p>
              <p className="text-gray-500 text-sm mt-1">Rating</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <p className="text-4xl font-bold text-blue-600">24/7</p>
              <p className="text-gray-500 text-sm mt-1">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose DevMart?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🚚",
                title: "Fast Delivery",
                desc: "Get your orders delivered within 24-48 hours anywhere in Pakistan.",
              },
              {
                icon: "💰",
                title: "Best Prices",
                desc: "We guarantee the lowest prices on all our products.",
              },
              {
                icon: "🔒",
                title: "Secure Payment",
                desc: "Your payments are 100% secure with end-to-end encryption.",
              },
              {
                icon: "↩️",
                title: "Easy Returns",
                desc: "30-day hassle-free return policy on all products.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition duration-300"
              >
                <p className="text-4xl mb-4">{item.icon}</p>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Meet The Developer
        </h2>
        <div className="flex justify-center">
          <div className="bg-white rounded-2xl shadow-md p-8 text-center max-w-sm">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <img
                src={HaseebImage}
                alt="Haseebi"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Haseebi</h3>
            <p className="text-blue-600 text-sm font-medium mt-1">
              Full Stack Developer
            </p>
            <p className="text-gray-500 text-sm mt-2 leading-relaxed">
              Haseebi is the passionate developer behind DevMart, dedicated to
              creating seamless online shopping experiences for users across
              Pakistan.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-blue-200 mb-8">
            Have questions? We'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <div className="bg-white/10 rounded-lg px-6 py-3">
              📧 ihaseeb0085@gmail.com
            </div>
            <div className="bg-white/10 rounded-lg px-6 py-3">
              📞 +92 3420085940
            </div>
            <div className="bg-white/10 rounded-lg px-6 py-3">
              📍 Islamabad, Pakistan
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
