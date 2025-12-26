"use client"

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What are the operating hours of MSU campus?",
            answer: "MSU campus is generally open from 8:00 AM to 10:00 PM on weekdays. Operating hours may vary for specific facilities such as the library and laboratories."
        },
        {
            question: "Where is the main administrative office located?",
            answer: "The main administrative office is located at the MSU Shah Alam main building, Level 3. Visitors may refer to the campus directory or virtual map for exact directions."
        },
        {
            question: "How can I contact MSU for general enquiries?",
            answer: "General enquiries can be made via the MSU official website, email, or by visiting the Student Services Office during working hours."
        },
        {
            question: "How can I check my class timetable?",
            answer: "Timetables can be viewed through the student portal under the academic section after successful course registration."
        },
        {
            question: "What are the operating hours of the MSU library?",
            answer: "The MSU library typically operates from 8:00 AM to 8:00 PM on weekdays. Hours may be extended during examination periods."
        },
        {
            question: "Can I access library resources online?",
            answer: "Yes, students can access e-books, journals, and academic databases through the MSU library portal using their student credentials."
        },
        {
            question: "How can I check my outstanding fees?",
            answer: "Outstanding fees can be viewed through the student statement section in the MSU portal."
        },
        {
            question: "What payment methods are accepted for tuition fees?",
            answer: "MSU accepts online banking, bank transfers, and selected payment gateways as listed on the official website."
        },
        {
            question: "Is parking available on campus?",
            answer: "Yes, parking is available for students and staff with a valid parking permit."
        },
        {
            question: "Where can I get help if I lose my student ID card?",
            answer: "Lost student ID cards should be reported to Admin office, where a replacement can be requested."
        }
    ];

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
                            <span className="font-semibold text-dark pr-4">
                                {index + 1}. {faq.question}
                            </span>
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
