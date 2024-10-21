import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    topic: '',
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FF5733] p-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-white mb-2">How can I help?</h1>
        <p className="text-white mb-6">
          Do you have a question or are you interested in working with my team and me?
          Just fill out the form fields below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="topic"
            placeholder="I'd like to chat about..."
            value={formData.topic}
            onChange={handleChange}
            className="bg-[#FF7F5C] text-white placeholder-white border-white w-full p-2"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-[#FF7F5C] text-white placeholder-white border-white p-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="bg-[#FF7F5C] text-white placeholder-white border-white p-2"
            />
          </div>
          <textarea
            name="message"
            placeholder="Message (remember, short is sweet please)"
            value={formData.message}
            onChange={handleChange}
            className="bg-[#FF7F5C] text-white placeholder-white border-white p-2 h-32 w-full"
          />
          <button
            type="submit"
            className="bg-white text-[#FF5733] hover:bg-gray-100 w-full p-2"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}