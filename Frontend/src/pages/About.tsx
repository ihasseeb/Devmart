import { motion } from "framer-motion";
import HaseebImage from "../assets/1.png";

const About = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-blue-900 via-blue-800 to-blue-600 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            About DevMart
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-blue-200 text-lg max-w-2xl mx-auto"
          >
            Pakistan's most trusted online store — built with passion, delivered
            with care.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Our Mission
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 leading-relaxed mb-4"
            >
              DevMart was founded with a simple goal — to make online shopping
              easy, affordable, and reliable for everyone in Pakistan.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-600 leading-relaxed"
            >
              We believe everyone deserves access to quality products at the
              best prices, with fast delivery right to their doorstep.
            </motion.p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "10K+", label: "Products", x: -80 },
              { value: "50K+", label: "Customers", x: 80 },
              { value: "4.9⭐", label: "Rating", x: -80 },
              { value: "24/7", label: "Support", x: 80 },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: stat.x }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-lg transition duration-300"
              >
                <p className="text-4xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 text-center mb-12"
          >
            Why Choose DevMart?
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🚚",
                title: "Fast Delivery",
                desc: "Get your orders delivered within 24-48 hours anywhere in Pakistan.",
                x: -60,
              },
              {
                icon: "💰",
                title: "Best Prices",
                desc: "We guarantee the lowest prices on all our products.",
                x: -20,
              },
              {
                icon: "🔒",
                title: "Secure Payment",
                desc: "Your payments are 100% secure with end-to-end encryption.",
                x: 20,
              },
              {
                icon: "↩️",
                title: "Easy Returns",
                desc: "30-day hassle-free return policy on all products.",
                x: 60,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: item.x }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition duration-300 cursor-pointer"
              >
                <p className="text-4xl mb-4">{item.icon}</p>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-900 text-center mb-12"
        >
          Meet The Developer
        </motion.h2>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl shadow-md p-8 text-center max-w-sm"
          >
            <motion.div
              initial={{ opacity: 0, rotate: -90 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden"
            >
              <img
                src={HaseebImage}
                alt="Haseebi"
                className="w-24 h-24 rounded-full object-cover"
              />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl font-bold text-gray-900"
            >
              Haseebi
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-blue-600 text-sm font-medium mt-1"
            >
              Full Stack Developer
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-gray-500 text-sm mt-2 leading-relaxed"
            >
              Haseebi is the passionate developer behind DevMart, dedicated to
              creating seamless online shopping experiences for users across
              Pakistan.
            </motion.p>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex justify-center gap-2 mt-4 flex-wrap"
            >
              {["React", "Node.js", "Python", "TypeScript", "MongoDB"].map(
                (skill, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.3, delay: 0.7 + i * 0.1 }}
                    className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full"
                  >
                    {skill}
                  </motion.span>
                ),
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-4"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-blue-200 mb-8"
          >
            Have questions? We'd love to hear from you!
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            {[
              { text: "📧 ihaseeb0085@gmail.com", x: -50 },
              { text: "📞 +92 3420085940", y: 30 },
              { text: "📍 Islamabad, Pakistan", x: 50 },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: item.x || 0, y: item.y || 0 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="bg-white/10 rounded-lg px-6 py-3 hover:bg-white/20 transition"
              >
                {item.text}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
