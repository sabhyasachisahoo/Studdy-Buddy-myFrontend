import React from 'react'
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

import PropTypes from 'prop-types';

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen  px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          {/* <ImageClipBox
            src="/img/contact1.jpg"
            clipClass="contact-clip-path-1"
          /> */}
          <ImageClipBox
            src="/img/contact.jpg"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/contact1.jpg"
            clipClass="absolute md:scale-125"
          />
          {/* <ImageClipBox
            src="/img/contact.jpg"
            clipClass="sword-man-clip-path md:scale-125"
          /> */}
        </div>

        <div className="flex flex-col items-center text-center special-font">
          <p className="mb-10 font-general text-[10px] uppercase">
            Join Studdy-Buddy
          </p>

          <AnimatedTitle
            title="Revol<b>u</b>tioni<b>z</b>ing le<b>a</b>rning,<br/> one cl<b>i</b>ck at a ti<b>m</b>e"
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-2xl !font-black !leading-[.9]"
          />

          <Button link='mailto:hackathonirman25@gmail.com?subject=Feel%20Free%20To%20Ask...&body=My%20Name%3A%3CYour%20name%20here%3E%0D%0AMy%20Resume%20link%3A%3CResume%20Link%3E%0D%0AMy%20LinkedIn%20link%3A%3CLinkedIn%20Link%3E' title="contact us" containerClass="mt-10 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
ImageClipBox.propTypes = {
  src: PropTypes.string.isRequired,
  clipClass: PropTypes.string.isRequired,
};

export default Contact;

