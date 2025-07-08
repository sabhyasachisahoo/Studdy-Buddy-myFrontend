import React from 'react'
import PropTypes from 'prop-types'

const Button = ({title ,id, leftIcon, rightIcon, containerClass, link }) => {
  return (
    <a href={link} id={id} target="_blank"  className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass} `}>
      {leftIcon}
      <span className='relative incline-flex overflow-hidden font-general text-xs uppercase'>
        <div>
          {title}
        </div>
      </span>
      {rightIcon}
    </a>
  )
}
Button.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    containerClass: PropTypes.string,
    link: PropTypes.string.isRequired,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
  }

export default Button
