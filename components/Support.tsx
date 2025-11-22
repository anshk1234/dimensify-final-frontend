import React from 'react';
import { MessageCircle, Mail, FileText, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const Support: React.FC = () => {
  return (
    <section className="py-24 bg-dark-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">We're here to help</h2>
            <p className="text-gray-400 text-lg mb-10">
              Whether you are just starting out or integrating Dimensify into an enterprise workflow, our support team is ready.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: MessageCircle, title: "Live Chat", text: "Available 24/5 for all plans.", link: "Start Chat", color: "text-brand-500" },
                { icon: Mail, title: "Email Support", text: "Detailed technical assistance.", link: "Send Email", color: "text-purple-500" },
                { icon: FileText, title: "Documentation", text: "Guides, API references, and FAQs.", link: "Read Docs", color: "text-green-500" },
                { icon: Clock, title: "Status", text: "99.99% Uptime monitored.", link: "Check Status", color: "text-orange-500" }
              ].map((item, index) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-black rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
                >
                  <item.icon className={`w-8 h-8 ${item.color} mb-4`} />
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{item.text}</p>
                  <a href="#" className="text-brand-400 text-sm font-medium hover:text-brand-300">{item.link} &rarr;</a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-dark-800 rounded-3xl p-8 border border-white/5"
          >
             <h3 className="text-xl font-bold mb-6">Contact Sales</h3>
             <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                    <input type="text" placeholder="Last Name" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                </div>
                <input type="email" placeholder="Work Email" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors" />
                <textarea placeholder="How can we help?" rows={4} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors resize-none" />
                <button type="submit" className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors">
                    SendMessage
                </button>
             </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};