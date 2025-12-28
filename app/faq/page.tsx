"use client"

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

import faqs from "@/data/campus_info.json";

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="flex flex-1 flex-col">
            <div className="flex flex-col gap-3">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-sm rounded-sm overflow-hidden transition-all duration-200"
                    >
                        {/* Question Button */}
                        <Button
                            onClick={() => toggleFAQ(index)}
                            className="flex items-center justify-between text-left p-4"
                        >
                            <div className="flex flex-col gap-1 pr-4">
                                <span className="text-[10px] uppercase tracking-wider text-crimson font-bold opacity-70">
                                    {faq.category}
                                </span>
                                <span className="font-semibold text-dark">
                                    {index + 1}. {faq.question}
                                </span>
                            </div>
                            <motion.div
                                className="shrink-0"
                                animate={{ rotate: openIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <ChevronDown className={`w-5 h-5 ${openIndex === index ? "text-crimson" : "text-dark"}`} />
                            </motion.div>
                        </Button>

                        {/* Answer */}
                        <AnimatePresence initial={false}>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeInOut",
                                        opacity: { duration: 0.2 }
                                    }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-4 pb-4 pt-2 bg-light/50 border-t border-neutral-200">
                                        <p className="text-dark/80 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
