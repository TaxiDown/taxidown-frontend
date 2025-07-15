'use client'

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Plane,
  Briefcase,
  Landmark,
  CalendarClock,
  ShieldCheck,
  Clock,
} from "lucide-react";

const services = [
  {
    title: "Airport Transfers",
    description: "Fast, comfortable airport pickups and drop-offs, always on time.",
    icon: <Plane className="w-10 h-10 text-black" />,
  },
  {
    title: "Corporate Travel",
    description: "Professional transportation for business meetings and executive events.",
    icon: <Briefcase className="w-10 h-10 text-black" />,
  },
  {
    title: "City Tours",
    description: "Explore major attractions with a local driver and flexible routes.",
    icon: <Landmark className="w-10 h-10 text-black" />,
  },
  {
    title: "Hourly Booking",
    description: "Hire a private driver by the hour with full flexibility and convenience.",
    icon: <CalendarClock className="w-10 h-10 text-black" />,
  },
  {
    title: "Secure Rides",
    description: "Enjoy safe, private rides with insured vehicles and vetted drivers.",
    icon: <ShieldCheck className="w-10 h-10 text-black" />,
  },
  {
    title: "24/7 Availability",
    description: "We operate around the clock to fit your travel schedule anytime.",
    icon: <Clock className="w-10 h-10 text-black" />,
  },
];

export default function OurServices() {
  return (
    <section className="py-16 px-4 text-center px-10">
      <h2 className="text-4xl font-bold mb-4">Our Services</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-10">
        We offer premium transportation services tailored to meet your needs. Ride in style with comfort and punctuality.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-15 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <AnimatedServiceCard
            key={index}
            title={service.title}
            description={service.description}
            icon={service.icon}
            delay={index * 0.2} 
          />
        ))}
      </div>
    </section>
  );
}

function AnimatedServiceCard({ title, description, icon,  delay = 0 }) {
  const { ref, inView } = useInView({ threshold: 0, triggerOnce: false });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{
        scale: inView ? 1 : 0.98,
        opacity: inView ? 1 : 0,
      }}
      transition={{
        duration: 1,
        ease:'backInOut',
        delay,
      }}
      className="bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all ease"
    >
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
