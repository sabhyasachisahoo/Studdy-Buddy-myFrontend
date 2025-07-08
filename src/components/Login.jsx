import React, { useState, useEffect } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    // if (formData.password !== formData.confirmPassword) {
    //   alert("Passwords do not match!");
    //   return;
    // }

    alert("Login form submitted!");
    window.location.href = "/";

  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert("Login form submitted!");
  // };

  return (
    <div className=" flex h-screen w-full bg-gradient-to-r bg-black items-center justify-center">
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
          <h1 className="text-5xl font-bold text-yellow-400">WELCOME BACK TO STUDYBUDDY</h1>
          <p className="text-xl font-semibold mt-2">YOUR PERSONAL SMART ASSISTANCE</p>
          <p className="mt-6 text-3xl font-bold text-yellow-400">LOGIN TO GET ACCESS TO THE PLATFORM 🚀</p>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="bg-white w-1/3 p-6 rounded-lg shadow-lg text-center">
        <img src="/img/preview.webp" alt="StudyBuddy Logo" className="mb-6 mx-auto" width="100" />
        <h2 className="mb-4 text-2xl font-semibold">LOGIN TO STUDYBUDDY</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
          <div className="mb-4">
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
          <div className="mb-4 text-right">
            <a href="#" className="text-blue-500 hover:underline text-sm">Forgot Password?</a>
          </div>
          <button type="submit" className="w-full py-2 mt-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700">LOGIN</button>
        </form>
      </div>
    </div>
  );
};

export default Login;