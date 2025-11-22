import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

export const Pricing: React.FC = () => {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      price: annual ? 0 : 0,
      desc: "For hobbyists and exploring.",
      features: ["5 AI Generations/mo", "Basic 3D Viewer", "Public Projects", "100MB Storage"],
      limitations: ["No Export", "Watermarked"]
    },
    {
      name: "Pro",
      price: annual ? 29 : 39,
      desc: "For professional creators.",
      popular: true,
      features: ["100 AI Generations/mo", "Advanced Materials", "GLB/OBJ Export", "10GB Storage", "Commercial License"],
      limitations: []
    },
    {
      name: "Studio",
      price: annual ? 99 : 129,
      desc: "For teams and agencies.",
      features: ["Unlimited Generations", "API Access", "Priority Support", "1TB Storage", "White-label Viewer", "Team Collaboration"],
      limitations: []
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 50 } }
  };

  return (
    <section id="pricing" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple Pricing</h2>
          
          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!annual ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
            <button 
              onClick={() => setAnnual(!annual)}
              className="w-14 h-8 bg-dark-700 rounded-full relative transition-colors focus:outline-none"
            >
              <div className={`absolute top-1 w-6 h-6 bg-brand-500 rounded-full transition-all duration-300 ${annual ? 'left-7' : 'left-1'}`} />
            </button>
            <span className={`text-sm font-medium ${annual ? 'text-white' : 'text-gray-500'}`}>
              Yearly <span className="text-brand-500 text-xs ml-1">(-20%)</span>
            </span>
          </div>
        </div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {plans.map((plan) => (
            <motion.div 
              key={plan.name} 
              variants={item}
              className={`relative p-8 rounded-3xl border transition-all duration-300 ${
                plan.popular 
                  ? 'bg-dark-800 border-brand-500 shadow-2xl scale-105 z-10' 
                  : 'bg-black border-white/10 hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{plan.desc}</p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-500">/mo</span>
              </div>

              <button className={`w-full py-3 rounded-xl font-bold text-sm mb-8 transition-colors ${
                plan.popular 
                  ? 'bg-brand-500 hover:bg-brand-400 text-white' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}>
                Choose {plan.name}
              </button>

              <div className="space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limit) => (
                   <div key={limit} className="flex items-start gap-3 text-sm text-gray-600">
                    <X className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{limit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};