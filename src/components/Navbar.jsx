import React, { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import { FaUserCircle, FaMicrophone, FaSearch } from 'react-icons/fa'; // Importing user, microphone, and search icons

const navItems = ["Summarizer", "Quiz", "FAQ", "About", "Contact"];
const aiDropdownItems = [
  { name: "Website", link: "https://llama.meta.com" },
  { name: "YouTube", link: "./login" },
  { name: "PDF", link: "https://deepseek.com" },
];

const Navbar = () => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [showAiDropdown, setShowAiDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isLoggedIn] = useState(!!localStorage.getItem("user"));
  const navContainerRef = useRef(null);
  const dropdownTimerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    if (navContainerRef.current) {
      gsap.to(navContainerRef.current, {
        y: isNavVisible ? 0 : -100,
        opacity: isNavVisible ? 1 : 0,
        duration: 0.2,
      });
    }
  }, [isNavVisible]);

  const handleSearch = (e) => {
    e.preventDefault();
    const lowerCaseInput = searchInput.toLowerCase();
    if (navItems.map(item => item.toLowerCase()).includes(lowerCaseInput)) {
      window.location.href = `/${lowerCaseInput}`; 
    } else {
      const foundLink = aiDropdownItems.find(item => item.name.toLowerCase() === lowerCaseInput);
      if (foundLink) {
        window.open(foundLink.link, "_blank"); // Open external links in a new tab
      }
    }
  };

  const startVoiceRecognition = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onstart = () => console.log("Voice recognition started...");
    
    recognition.onresult = (event) => {
      // Get the spoken text from the speech recognition result
      const spokenText = event.results[0][0].transcript;
      
      // Clean the text:
      // 1. No capitalizing the first letter (keeping the text as is)
      // 2. Ensure there is no period at the end.
      const formattedText = spokenText.trim().replace(/\s+/g, '').replace(/\.$/, ''); // Removes a period at the end if exists.
      
      // Set the processed text as the search input
      setSearchInput(formattedText);

      // Now, automatically navigate to the corresponding page
      const lowerCaseInput = formattedText.toLowerCase();
      if (navItems.map(item => item.toLowerCase()).includes(lowerCaseInput)) {
        window.location.href = `/${lowerCaseInput}`; // Redirect to the corresponding component
      } else {
        const foundLink = aiDropdownItems.find(item => item.name.toLowerCase() === lowerCaseInput);
        if (foundLink) {
          window.open(foundLink.link, "_blank"); // Open external links in a new tab
        }
      }
    };
    
    recognition.onerror = (event) => console.error("Speech recognition error:", event.error);
    recognition.start();
  };

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7 font-bold">
            <img
              src="/img/logo.png"
              alt="Home"
              onClick={() => (window.location.href = "/")}
              className="w-30 cursor-pointer"
            />
            <form onSubmit={handleSearch} className="flex relative w-64">
              <input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="border rounded-lg px-2 py-1 text-white border-white pr-10 w-full"
              />
              <FaMicrophone
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
                onClick={startVoiceRecognition}
              />
              <button type="submit" className="absolute right-1 top-1/2 transform -translate-y-1/2 text-white">
                <FaSearch className="text-xl" />
              </button>
            </form>
          </div>
          <div className="flex h-full items-center">
            <div className="hidden md:flex gap-6 relative">
              {navItems.map((item, index) =>
                 item === "Summarizer" ? (
                  <div
                    key={index}
                    className="relative group"
                    onMouseEnter={() => {
                      clearTimeout(dropdownTimerRef.current);
                      setShowAiDropdown(true);
                    }}
                    onMouseLeave={() => {
                      dropdownTimerRef.current = setTimeout(() => {
                        setShowAiDropdown(false);
                      }, 100);
                    }}
                  >
                    <a href="#summarizer" className="nav-hover-btn">
                      Summarizer
                    </a>
                    {showAiDropdown && (
                      <div className="absolute left-0 mt-4.5 w-40 bg-white opacity-60 shadow-lg rounded-lg py-2">
                        {aiDropdownItems.map((aiItem, i) => (
                          <a
                            key={i}
                            href={aiItem.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 text-black hover:bg-gray-200"
                          >
                            {aiItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                    
                  </div>
                ) : (
                  <a
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    className="nav-hover-btn"
                  >
                    {item}
                  </a>
                )
              )}
               <div className="relative" onMouseEnter={() => { clearTimeout(dropdownTimerRef.current); setShowUserDropdown(true); }} onMouseLeave={() => {
                      dropdownTimerRef.current = setTimeout(() => {
                        setShowUserDropdown(false);
                      }, 100);
                     }}>
                      <FaUserCircle className="text-2xl  text-white cursor-pointer" onClick={() => {
                    if (isLoggedIn) {
                      window.location.href = "/dashboard";
                    }
                  }} />
                          {showUserDropdown && (
                         <div className="absolute right-0 mt-2 w-40 bg-white opacity-80 shadow-lg rounded-lg py-2">
                         <a href="/login" className="block px-4 py-2 hover:bg-gray-200" onClick={() => localStorage.setItem("user", "true")}>
                      Login
                    </a>
                    <a href="/signup" className="block px-4 py-2 hover:bg-gray-200" onClick={() => localStorage.setItem("user", "true")}>
                      Signup
                    </a>
                         </div>
                          )}
                </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;















// import React, { useEffect, useRef, useState } from "react";
// import { useWindowScroll } from "react-use";
// import gsap from "gsap";
// import { FaUserCircle, FaMicrophone, FaSearch } from 'react-icons/fa'; 
// import { Link } from "react-router-dom";

// const navItems = [
//   { name: "Home", link: "/" },
//   { name: "Summarizer", dropdown: true, items: [
//       { name: "YouTube", link: "/YoutubeSum" },
//       { name: "PDF", link: "/PDFSum" },
//       { name: "Website", link: "/WebSum" }
//     ]
//   },
//   { name: "Quiz", link: "/quiz" },
//   { name: "Contact", link: "/contact" },
//   { name: "Todo", link: "/todo" },
//   { name: "StudyBuddy", link: "/chatbot" },
//   { name: "Lesson Planner", link: "/lessonplan" }
// ];

// const Navbar = () => {
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [isNavVisible, setIsNavVisible] = useState(true);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const navContainerRef = useRef(null);
//   const dropdownTimerRef = useRef(null);
//   const { y: currentScrollY } = useWindowScroll();

//   useEffect(() => {
//     if (currentScrollY === 0) setIsNavVisible(true);
//     else if (currentScrollY > lastScrollY) setIsNavVisible(false);
//     else setIsNavVisible(true);
//     setLastScrollY(currentScrollY);
//   }, [currentScrollY, lastScrollY]);

//   useEffect(() => {
//     if (navContainerRef.current) {
//       gsap.to(navContainerRef.current, {
//         y: isNavVisible ? 0 : -100,
//         opacity: isNavVisible ? 1 : 0,
//         duration: 0.2,
//       });
//     }
//   }, [isNavVisible]);

//   return (
//     <div ref={navContainerRef} className="fixed top-4 w-full z-50">
//       <nav className="flex justify-between items-center p-4">
//         <Link to="/">
//           <img src="/img/logo.png" alt="Home" className="w-30 cursor-pointer" />
//         </Link>
//         <div className="flex space-x-6">
//           {navItems.map((item, index) => (
//             item.dropdown ? (
//               <div key={index} className="relative group"
//                 onMouseEnter={() => { clearTimeout(dropdownTimerRef.current); setShowDropdown(true); }}
//                 onMouseLeave={() => { dropdownTimerRef.current = setTimeout(() => setShowDropdown(false), 100); }}>
//                 <span className="cursor-pointer">{item.name}</span>
//                 {showDropdown && (
//                   <div className="absolute mt-2 w-40 bg-white shadow-lg rounded-lg py-2">
//                     {item.items.map((subItem, i) => (
//                       <Link key={i} to={subItem.link} className="block px-4 py-2 hover:bg-gray-200">
//                         {subItem.name}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <Link key={index} to={item.link} className="hover:text-gray-500">
//                 {item.name}
//               </Link>
//             )
//           ))}
//         </div>
//         <FaUserCircle className="text-2xl text-white cursor-pointer" />
//       </nav>
//     </div>
//   );
// };

// export default Navbar;
