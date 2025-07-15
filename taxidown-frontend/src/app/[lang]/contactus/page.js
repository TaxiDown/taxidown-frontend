'use client'; // only needed in app directory if using state

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend or service
    console.log('Form submitted:', form);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12 lg:px-32">
      <div className="max-w-5xl mx-auto bg-white p-10 shadow-xl rounded-xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
        <p className="text-gray-600 mb-10">
          Have a question or want to work together? We'd love to hear from you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-6 text-gray-700">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Our Office</h2>
              <p>123 Business St.<br />Cairo, Egypt</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">Email</h2>
              <p>support@example.com</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">Phone</h2>
              <p>+20 123 456 7890</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
