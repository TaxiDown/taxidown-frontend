"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Plane, Briefcase, Landmark, CalendarClock, ShieldCheck, Clock } from "lucide-react"

const services = [
  {
    title: "Airport Transfers",
    description: "Fast, comfortable airport pickups and drop-offs, always on time.",
    icon: Plane,
    color: "text-black bg-stone-200",
    hoverColor: "hover:bg-amber-100",
  },
  {
    title: "Corporate Travel",
    description: "Professional transportation for business meetings and executive events.",
    icon: Briefcase,
    color: "text-black bg-stone-200",
    hoverColor: "hover:bg-amber-100",
  },
  {
    title: "City Tours",
    description: "Explore major attractions with a local driver and flexible routes.",
    icon: Landmark,
    color: "text-black bg-stone-200",
    hoverColor: "hover:bg-amber-100",
  },
  {
    title: "Hourly Booking",
    description: "Hire a private driver by the hour with full flexibility and convenience.",
    icon: CalendarClock,
    color: "text-black bg-stone-200",
    hoverColor: "hover:bg-amber-100",
  },
  {
    title: "Secure Rides",
    description: "Enjoy safe, private rides with insured vehicles and vetted drivers.",
    icon: ShieldCheck,
    color: "text-black bg-stone-200",
    hoverColor: "hover:bg-amber-100",
  },
  {
    title: "24/7 Availability",
    description: "We operate around the clock to fit your travel schedule anytime.",
    icon: Clock,
    color: "text-black bg-stone-200",
    hoverColor: "hover:bg-amber-100",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94], 
    },
  },
}

export default function OurServices() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: "-50px 0px",
  })

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Our Services</h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We offer premium transportation services tailored to meet your needs. Ride in style with comfort and
            punctuality.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} variants={itemVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ServiceCard({ service, variants }) {
  const IconComponent = service.icon

  return (
    <motion.div
      variants={variants}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
      className={`
        group relative bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100
        hover:shadow-xl hover:border-gray-200 transition-all duration-300 cursor-pointer
        focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2
      `}
    >
      <motion.div
        className={`
          inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 
          rounded-xl mb-4 sm:mb-6 ${service.color} ${service.hoverColor}
          transition-colors duration-300
        `}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        <IconComponent className="w-7 h-7 sm:w-8 sm:h-8" />
      </motion.div>

      <div className="space-y-3 sm:space-y-4">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 group-hover:text-gray-800 transition-colors duration-200">
          {service.title}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{service.description}</p>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  )
}
