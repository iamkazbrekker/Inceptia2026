"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "What is Inceptia 2K26?",
    answer: "Inceptia 2K26 is a 24-hour national level hackathon designed to bring together the brightest minds to solve real-world problems using technology."
  },
  {
    question: "Who can participate?",
    answer: "The hackathon is open to all university students, regardless of their major or experience level. If you have a passion for technology and innovation, you belong here!"
  },
  {
    question: "Do I need a team?",
    answer: "Yes, you can participate in teams of 2 to 4 members. If you don't have a team, don't worry! We will have team formation sessions before the hackathon begins."
  },
  {
    question: "How much does it cost?",
    answer: "Participation in Inceptia 2K26 is completely free! We provide food, swag, and a magical environment for you to build your projects."
  },
  {
    question: "What should I bring?",
    answer: "Bring your laptop, charger, student ID, and any other hardware you might need for your project. A sleeping bag is also recommended if you plan to rest!"
  }
];

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative z-10 w-full flex flex-col items-center justify-center px-4 md:px-12 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <h2 className="font-harry-potter text-5xl md:text-7xl text-white text-center drop-shadow-[0_0_20px_rgba(255,215,0,0.4)] mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="border border-yellow-500/20 rounded-2xl bg-black/40 backdrop-blur-md overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="text-xl text-yellow-100 font-medium font-body-lg">
                  {faq.question}
                </span>
                <span className="text-yellow-500 ml-4">
                  <svg
                    className={`w-6 h-6 transform transition-transform duration-300 ${
                      activeIndex === idx ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6 pt-0 text-gray-300 font-body-lg border-t border-yellow-500/10">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
