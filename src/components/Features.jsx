import React from "react";
import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

BentoTilt.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const BentoCard = ({
  src,
  title,
  description,
  isComingSoon,
  subscribeLink,
}) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-black">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-90 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <a
            href={subscribeLink}
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">Click</p>
          </a>
        )}
        {/* {isComingSoon && (
          <a
            href="./plans"
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
            style={{
              opacity: hoverOpacity,
              background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
            }}
          >
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </a>
        )} */}
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          AI-Powered Learning, Redefined!
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          Experience the future of education with advanced AI that simplifies
          complex topics, generates instant summaries, and enhances your
          learning efficiency.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/feature-1.mp4"
          title={<>Yout<b>u</b>be Summ<b>a</b>rizer</>}
          description="Save time with our AI-powered YouTube Summarizer – get instant, easy-to-understand summaries of educational videos! No more rewinding, just smarter learning at your fingertips!🚀🎥📚"
          isComingSoon
          subscribeLink="/plans"
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-2 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/feature-2.mp4"
            title={<>W<b>e</b>b S<b>u</b>mmar<b>i</b>zer</>}
            description="Our Web Summarizer uses advanced AI to condense long web content into concise, easy-to-understand summaries, highlighting key points from articles, blog posts, and news pieces for quick insights."
            isComingSoon
            subscribeLink="" //give Link
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2  ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/feature-3.mp4"
            title={
              <>
                M<b>o</b>ck T<b>e</b>st
              </>
            }
            description="Prepare for success with StudyBuddy's comprehensive mock tests designed to help you master your subjects!"
            isComingSoon
            subscribeLink="" //give Link
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/feature-5.mp4"
            title={
              <>
                Das<b>h</b>bo<b>a</b>rd
              </>
            }
            description="StudyBuddy's personalized dashboard offers a customized view of your progress, goals, and resources to enhance your learning journey"
            isComingSoon
            subscribeLink="" //give Link
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              StudyB<b>u</b>ddy  P<b>r</b>o  Vers<b>io</b>n  Co<b>m</b>ing  S<b>oo</b>n...
            </h1>

            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <video
            src="videos/feature-4.mp4"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);
BentoCard.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.string,
  isComingSoon: PropTypes.bool,
  subscribeLink: PropTypes.string,
};

export default Features;
