import React from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FlipCard from "./components/FlipCard/FlipCard";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Plans from "./components/Plans";
import Pomodoro from "./components/Pomodoro/Pomodoro"; 
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// const plans = [
//   {
//     frontImage: "basic-plan.jpg",
//     planName: "Basic",
//     price: 9.99,
//     features: ["Access to courses", "Limited quizzes", "Community support"],
//   },
//   {
//     frontImage: "pro-plan.jpg",
//     planName: "Pro",
//     price: 19.99,
//     features: ["Everything in Basic", "Unlimited quizzes", "AI tutor"],
//   },
//   {
//     frontImage: "elite-plan.jpg",
//     planName: "Elite",
//     price: 29.99,
//     features: ["Everything in Pro", "1-on-1 mentorship", "Exclusive content"],
//   },
// ];

const cardsData = [
  {
    frontImage: "./img/about.webp",
    backText: "Sabhyasachi Sahoo",
  },
  {
    frontImage: "./img/2.jpg",
    backText: "Anurag Panda",
  },
  {
    frontImage: "./img/4.jpg",
    backText: "Priyanshu Tiwary",
  },
  {
    frontImage: "./img/3.jpg",
    backText: "Ashit Kumar Panigrahi",
  },
  {
    frontImage: "./img/1.jpg",
    backText: "Dibyanshu Tripathy",
  },
];

const App = () => {
  
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden ">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <Hero />
      {/* <div className="card-container">
      {plans.map((plan, index) => (
        <FlipCard key={index} {...plan} />
      ))}
    </div> */}
      <About />
      <Features />
      <Story />
      <Contact />
      <div className="card-container">
        {cardsData.map((card, index) => (
          <FlipCard
            key={index}
            frontImage={card.frontImage}
            backText={card.backText}
          />
        ))}
      </div>
      <Footer />
    </main>
  );
};

export default App;
