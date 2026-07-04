"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "What is INCEPTIA 2K26?",
    answer: "INCEPTIA 2K26 is a 24-hour national hackathon inspired by the magical universe of Harry Potter. It challenges teams to solve real-world problems and showcase their technical brilliance to industry experts."
  },
  {
    question: "Where and when is the hackathon?",
    answer: "The event will take place on the 7th and 8th of August at the 6th Floor Auditorium, PCCOER."
  },
  {
    question: "Do I need a team to participate?",
    answer: "Yes, you need to assemble a team of 2 to 4 members to participate in the hackathon."
  },
  {
    question: "How much is the registration fee?",
    answer: "The registration fee is ₹549 per person. However, this is only applicable for teams that are shortlisted for Round 2."
  },
  {
    question: "What is the format of the competition?",
    answer: "Round 1 is an Idea Submission where teams submit a PPT evaluated on innovation, technical feasibility, and impact. Shortlisted teams will advance to Round 2, which is the intense 24-hour hackathon to build and present a functional prototype."
  },
  {
    question: "What is the prize pool?",
    answer: "The winning team takes home ₹25,000! The 2nd Prize is ₹15,000, and the 3rd Prize is ₹10,000."
  },
  {
    question: "Why should I participate?",
    answer: "Expect 24 hours of pure innovation, networking with mentors and professionals, evaluation by industry experts, exciting cash prizes, and potential internship opportunities for outstanding teams. All finalists also receive a certificate of participation."
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
