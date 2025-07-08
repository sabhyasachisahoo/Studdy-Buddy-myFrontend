import React, { useState, useEffect } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    dob: "",
    education: "",
    role: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prevIndex) => (prevIndex + 1) % 3); // Change image every 3 seconds
    }, 3000);

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert("Form submitted successfully!");
    window.location.href = "/";

  };

  return (
    <div className=" flex h-screen w-full bg-gradient-to-r from-purple-500 to-blue-500 items-center justify-center">
      {/* Left Section with Image Slider */}
      <div className="relative w-2/3 h-full flex justify-center items-center">
        <img
          src="/img/student1.jpeg"
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${activeImage === 0 ? "opacity-100" : "opacity-0"}`}
          alt="Student 1"
        />
        <img
          src="/img/student2.jpeg"
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${activeImage === 1 ? "opacity-100" : "opacity-0"}`}
          alt="Student 2"
        />
        <img
          src="/img/student3.png"
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${activeImage === 2 ? "opacity-100" : "opacity-0"}`}
          alt="Student 3"
        />
        <div className="absolute z-10 text-center text-white p-6">
          <h1 className="text-5xl font-bold text-yellow-400">WELCOME TO STUDYBUDDY</h1>
          <p className="text-xl font-semibold mt-2">YOUR PERSONAL SMART ASSISTANCE</p>
          <p className="mt-6 text-3xl font-bold text-yellow-400">
            JOIN NOW <span role="img" aria-label="emoji" className="text-4xl">😎</span>
          </p>
          <p className="text-lg mt-2">BECOME A STUDYBUDDY</p>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="bg-white w-1/3 p-6 rounded-lg shadow-lg text-center">
        <img src="/img/preview.webp" alt="StudyBuddy Logo" className="mb-6 mx-auto" width="100" />
        <h2 className="mb-4 text-2xl font-semibold">JOIN STUDYBUDDY</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-1">
            <label htmlFor="username" className="block text-sm font-semibold">FULL NAME</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-1">
            <label htmlFor="dob" className="block text-sm font-semibold">DATE OF BIRTH</label>
            <input
              type="date"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-1">
            <label htmlFor="education" className="block text-sm font-semibold">EDUCATION QUALIFICATION</label>
            <select
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              required
            >
              <option selected disabled>CHOOSE...</option>
              <option>SENIOR SECONDARY SCHOOL</option>
              <option>SECONDARY SCHOOL</option>
              <option>COLLEGE</option>
            </select>
          </div>
          <div className="mb-1">
            <label htmlFor="role" className="block text-sm font-semibold">SELECT YOUR ROLE</label>
            <select
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option selected disabled>CHOOSE...</option>
              <option>STUDENT</option>
              <option>DEVELOPER</option>
              <option>UI/UX DESIGNER</option>
              <option>DATA SCIENTIST</option>
              <option>SOFTWARE ENGINEER</option>
              <option>ENTREPRENEUR</option>
              <option>RESEARCHER</option>
              <option>FREELANCER</option>
            </select>
          </div>
          <div className="mb-1">
            <label htmlFor="email" className="block text-sm font-semibold">EMAIL ADDRESS</label>
            <input
              type="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-1">
            <label htmlFor="password" className="block text-sm font-semibold">PASSWORD</label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-1">
            <label htmlFor="confirmPassword" className="block text-sm font-semibold">CONFIRM PASSWORD</label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
              id="confirm-password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="w-full py-2 mt-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700">SIGN UP</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
