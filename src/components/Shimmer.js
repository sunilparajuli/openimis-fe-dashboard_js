import React, { Component } from 'react';
const STYLE_ID = 'shimmer-component-styles';

const shimmerCSS = `
  .shimmer-wrapper {
    position: relative;
    overflow: hidden;
    background-color: #e0e0e0; /* Base color of the placeholder */
    border-radius: 4px;
  }

  /* The animated "shine" pseudo-element */
  .shimmer-wrapper::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg, 
      transparent, 
      rgba(255, 255, 255, 0.4), 
      transparent
    );
    transform: translateX(-100%);
    animation: shimmer 1.5s infinite; /* Link to the keyframes animation */
  }

  /* The animation that moves the shine effect */
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
`;

class Shimmer extends Component {
  componentDidMount() {
    if (!document.getElementById(STYLE_ID)) {
      const styleElement = document.createElement('style');
      styleElement.id = STYLE_ID;
      styleElement.innerHTML = shimmerCSS;
      document.head.appendChild(styleElement);
    }
  }

  render() {
    const { className, style } = this.props;

    const defaultStyle = {
      width: '100%',
      height: '200px', 
    };

    const combinedStyles = { ...defaultStyle, ...style };

    return (
      <div
        className={`shimmer-wrapper ${className || ''}`}
        style={combinedStyles}
      />
    );
  }
}

export default Shimmer;
