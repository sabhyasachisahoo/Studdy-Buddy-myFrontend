import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import for navigation

const Plans = () => {
    const navigate = useNavigate(); // ✅ React Router navigation

    const plansData = [
        {
            frontImage: "./img/basic.webp",
            // planName: "Basic",
            price: 10,
            features: ["Feature A", "Feature B", "Feature C"],
            subscribeLink: "https://paytm.com/"
        },
        {
            frontImage: "./img/pro.webp",
            // planName: "Pro",
            price: 20,
            features: ["Feature D", "Feature E", "Feature F"],
            subscribeLink: "https://paytm.com/"
        },
        {
            frontImage: "./img/prem.webp",
            // planName: "Premium",
            price: 30,
            features: ["Feature G", "Feature H", "Feature I"],
            subscribeLink: "https://paytm.com/"
        }
    ];

    return (
        <div className="full-page-container">
            {/* ✅ Back Button to go to Hero.jsx */}
            <button className="close-btn !text-white" onClick={() => navigate('/')}>⬅ Back</button>
            
            <div className="plans-container-centered">
                {plansData.map(({ frontImage, planName, price, features, subscribeLink }, index) => (
                    <div className="flip-card" key={index}>
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <img src={frontImage} alt={planName} className="card-image" />
                                <div className="plan-name">{planName}</div>
                            </div>
                            <div className="flip-card-back">
                                <h3>{planName} Plan</h3>
                                <h2 className="price">${price}/month</h2>
                                <ul className="feature-list">{features.map((feature, idx) => <li key={idx}>{feature}</li>)}</ul>
                                
                                {/* ✅ Subscribe Button Navigates to Link */}
                                <a href={subscribeLink} target="_blank" rel="noopener noreferrer" className="subscribe-btn">
                                    Subscribe
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Plans;
