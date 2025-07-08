import React, { useState, useEffect } from "react";
import Card from "./ui/Card";
import  Progress  from "./ui/progress";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
// import { Avatar } from "./ui/avatar";
import { FaLinkedin, FaGithub, FaGlobe, FaTwitter, FaCalendarAlt, FaBell, FaShareAlt } from "react-icons/fa";
import  Button  from "./ui/button";
import { motion } from "framer-motion";
import  Select  from "./ui/select";
import { io } from "socket.io-client";
import Avatar from './ui/avatar';

// Dummy data for charts
const contestData = [
  { name: "2022", rating: 1400 },
  { name: "2023", rating: 1750 },
  { name: "2024", rating: 1923 },
];

// const languages = ["English", "Spanish", "French", "German", "Chinese"];

// Dashboard Component
const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [userData, setUserData] = useState({});
  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState([]);

  // Fetch user data on mount and setup WebSocket connection for live updates
  useEffect(() => {
    // Fetch user data from the API or database
    fetch("/api/userData")
      .then((response) => response.json())
      .then((data) => setUserData(data));

    // Setup WebSocket connection for real-time data updates
    const socket = io("http://localhost:3000");

    // Listen for user data updates via WebSocket
    socket.on("updateUserData", (data) => {
      setUserData(data);
    });

    // Listen for notifications updates
    socket.on("newNotification", (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    // Listen for leaderboard updates
    socket.on("updateLeaderboard", (leaderboard) => {
      setLeaderboardData(leaderboard);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center w-full mb-4">
        <Button onClick={() => setDarkMode(!darkMode)}>
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </Button>
        {/* <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </Select> */}
      </div>

      {/* User Profile */}
      <Card
        className={`col-span-1 p-6 shadow-xl ${
          darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
        } rounded-lg`}
      >
        <div className="flex items-center gap-4">
          <Avatar
            src={userData.profilePic || "/profile.jpg"}
            alt="User Avatar"
            className="w-20 h-20 border-4 border-yellow-500"
          />
          <div>
            <h2 className="text-2xl font-bold text-yellow-500">
              {userData.name || "User Name"}
            </h2>
            <p className="text-gray-400">{userData.profession || "Profession"}</p>
            <p className="text-gray-500">{userData.comment || "Passionate about learning!"}</p>
            <div className="flex gap-3 mt-2">
              {userData.linkedin && (
                <a href={userData.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-blue-400 text-xl" />
                </a>
              )}
              {userData.github && (
                <a href={userData.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="text-gray-300 text-xl" />
                </a>
              )}
              {userData.website && (
                <a href={userData.website} target="_blank" rel="noopener noreferrer">
                  <FaGlobe className="text-green-400 text-xl" />
                </a>
              )}
              {userData.twitter && (
                <a href={userData.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="text-blue-300 text-xl" />
                </a>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Contest Rating */}
      <Card
        className={`p-6 shadow-lg ${
          darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
        } rounded-lg`}
      >
        <h3 className="text-xl font-semibold mb-3 text-yellow-500">Contest Rating</h3>
        <p className="text-gray-400">
          Current Rating: <b>{userData.rating || "1923"}</b>
        </p>
        <p className="text-gray-400">
          Global Ranking: <b>19,203 / 496,921</b>
        </p>
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={contestData}>
            <XAxis dataKey="name" stroke={darkMode ? "#aaa" : "#555"} />
            <YAxis hide />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="rating" stroke="#ffcc00" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Notifications */}
      <Card
        className={`p-6 shadow-lg ${
          darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
        } rounded-lg`}
      >
        <h3 className="text-xl font-semibold mb-3 text-yellow-500">Notifications</h3>
        <div className="space-y-2">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={index} className="p-2 bg-gray-200 rounded">
                <p>{notification.message}</p>
              </div>
            ))
          ) : (
            <p>No new notifications</p>
          )}
        </div>
      </Card>

      {/* Problem Solving Stats */}
      <Card
        className={`p-6 shadow-lg ${
          darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
        } rounded-lg`}
      >
        <h3 className="text-xl font-semibold mb-3 text-yellow-500">Problem Solving Stats</h3>
        <p className="text-gray-400">
          Total Problems Solved: <b>{userData.totalProblemsSolved || "1355"}</b>
        </p>
        <p className="text-gray-400">
          Easy: <b>{userData.easySolved || "453"}</b> | Medium: <b>{userData.mediumSolved || "772"}</b> | Hard: <b>{userData.hardSolved || "130"}</b>
        </p>
        <Progress value={userData.problemSolvingProgress || 80} className="mt-2" />
      </Card>

      {/* Leaderboard */}
      <Card
        className={`col-span-1 md:col-span-2 lg:col-span-3 p-6 shadow-xl ${
          darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
        } rounded-lg`}
      >
        <h3 className="text-xl font-semibold mb-3 text-yellow-500">Global Leaderboard</h3>
        <ul className="space-y-2">
          {leaderboardData.length > 0 ? (
            leaderboardData.map((user, index) => (
              <li key={index} className="p-2 bg-gray-200 rounded">
                <span>{user.name}</span> - <span>{user.score}</span>
              </li>
            ))
          ) : (
            <p>No leaderboard data available</p>
          )}
        </ul>
      </Card>

      {/* Sync with Calendar and Share */}
      <Card
        className={`p-6 shadow-lg ${
          darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
        } rounded-lg flex justify-between items-center`}
      >
        <Button>
          <FaBell className="mr-2" /> Notifications
        </Button>
        <Button>
          <FaCalendarAlt className="mr-2" /> Sync with Calendar
        </Button>
        <Button>
          <FaShareAlt className="mr-2" /> Share Progress
        </Button>
      </Card>

      {/* Heatmap */}
      <Card
        className={`col-span-1 md:col-span-2 lg:col-span-3 p-6 shadow-xl ${
          darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
        } rounded-lg`}
      >
        <h3 className="text-xl font-semibold mb-3 text-yellow-500">Learning Activity Heatmap</h3>
        <img src="/heatmap.png" alt="Study Activity Heatmap" className="w-full rounded-lg shadow-md" />
      </Card>
    </motion.div>
  );
};

export default Dashboard;
