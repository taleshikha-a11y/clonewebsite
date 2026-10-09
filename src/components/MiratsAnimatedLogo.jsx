import React, { useState } from 'react';

const MiratsAnimatedLogo = () => {
  const [hoverCount, setHoverCount] = useState(-1);
  const [mouseLeave, setMouseLeave] = useState(false);

  const handleMouseEnter = () => {
    setMouseLeave(false);
    setHoverCount((prev) => (prev + 1) % 4);
  };

  const handleMouseLeave = () => {
    setMouseLeave(true);
  };

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        width="44"
        height="44"
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="72" height="72" rx="6.91271" fill="#E8EBF7" />
        <path
          className="transition-all duration-500 ease-in-out origin-top-left"
          style={{
            transform: mouseLeave
              ? 'scale(1)'
              : hoverCount === 0
                ? 'scaleX(1.6) scaleY(1.5) translate(-6px, -4px)'
                : hoverCount === 1
                  ? 'scaleX(0.75) scaleY(1.5) translate(0px, -4px)'
                  : hoverCount === 2 || hoverCount === 3
                    ? 'scaleX(1.1) scaleY(0.5) translate(-4px, 8px)'
                    : 'scaleX(1)',
          }}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M29.7217 13.8143C29.7217 14.4595 29.9352 15.0091 30.3618 15.4632C30.812 15.8931 31.3566 16.1083 31.9962 16.1083H34.2719V29.6822H31.9962C31.3567 29.6823 30.8119 29.8975 30.3618 30.3273C29.9353 30.7813 29.7218 31.3311 29.7217 31.9762V34.2703H11.5212V11.5203H29.7217V13.8143ZM22.896 20.6963C22.2563 20.6964 21.7117 20.9242 21.2615 21.3781C20.8351 21.8321 20.6216 22.3692 20.6215 22.9904C20.6215 23.6356 20.835 24.1852 21.2615 24.6393C21.7117 25.0693 22.2563 25.2843 22.896 25.2844C23.5121 25.2844 24.0453 25.0694 24.4956 24.6393C24.9458 24.1852 25.1716 23.6356 25.1716 22.9904C25.1715 22.3692 24.9457 21.8321 24.4956 21.3781C24.0453 20.9241 23.5121 20.6963 22.896 20.6963Z"
          fill="#1570EF"
        />
        <path
          className="transition-all duration-500 ease-in-out origin-top-right"
          style={{
            transform: mouseLeave
              ? 'scale(1)'
              : hoverCount === 0
                ? 'scaleX(0.6) scaleY(1.5) translate(0px, -4px)'
                : hoverCount === 1
                  ? 'scaleY(1.5) scaleX(1.4) translate(6px, -4px)'
                  : hoverCount === 2 || hoverCount === 3
                    ? 'scaleX(1.1) scaleY(0.5) translate(4px, 8px)'
                    : 'scaleY(1)',
          }}
          d="M55.929 11.52V13.814C55.929 14.4354 56.1537 14.9734 56.6039 15.4274C57.0541 15.8813 57.5874 16.108 58.2034 16.1081H60.4789V29.682H58.2034C57.5638 29.682 57.0189 29.9089 56.5688 30.3626C56.1423 30.8166 55.929 31.3548 55.929 31.976V34.27H42.2782V31.976C42.2781 31.3548 42.0535 30.8166 41.6032 30.3626C41.153 29.9086 40.6188 29.682 40.0027 29.682H37.7283V16.1081H40.0038C40.6433 16.1079 41.1883 15.8812 41.6384 15.4274C42.065 14.9734 42.2782 14.4354 42.2782 13.814V11.52H55.929Z"
          fill="#1570EF"
        />
        <path
          className="transition-all duration-500 ease-in-out origin-bottom-left"
          style={{
            transform: mouseLeave
              ? 'scale(1)'
              : hoverCount === 0 || hoverCount === 1
                ? ' scaleY(0.5) scaleX(1.1) translate(-3px, -8px)'
                : hoverCount === 2
                  ? 'scaleX(1.7) scaleY(1.5) translate(-7px, 4px)'
                  : hoverCount === 3
                    ? 'scaleX(0.7) scaleY(1.5) translate(0px, 4px)'
                    : 'scale(1,1)',
          }}
          d="M16.0714 60.48V58.205C16.0714 57.5888 15.8462 57.0556 15.396 56.6054C14.9457 56.1551 14.4125 55.93 13.7963 55.93H11.5212V37.73H20.6215V40.005C20.6215 40.6448 20.8348 41.1899 21.2614 41.6401C21.7116 42.0667 22.2567 42.28 22.8966 42.28C23.5127 42.28 24.0459 42.0667 24.4956 41.6401C24.9465 41.1899 25.1716 40.6448 25.1716 40.005V37.73H34.2719V55.93H31.9968C31.3569 55.93 30.8119 56.1551 30.3616 56.6054C29.935 57.0556 29.7217 57.5888 29.7217 58.205V60.48H16.0714Z"
          fill="#1570EF"
        />
        <path
          className="transition-all duration-500 ease-in-out origin-bottom-right"
          style={{
            transform: mouseLeave
              ? 'scale(1)'
              : hoverCount === 0 || hoverCount === 1
                ? ' scaleY(0.5) scaleX(1.1) translate(6px, -8px)'
                : hoverCount === 2
                  ? 'scaleY(1.5) scaleX(0.6) translate(0px, 4px)'
                  : hoverCount === 3
                    ? 'scaleX(1.6) scaleY(1.5) translate(6px, 4px)'
                    : 'scale(1)',
          }}
          d="M57.8141 37.73C59.286 37.7302 60.4789 38.9411 60.4789 40.4341V57.7759C60.4789 59.2689 59.286 60.4797 57.8141 60.48H40.3931C38.9212 60.4798 37.7283 59.2689 37.7283 57.7759V40.4341C37.7283 38.9411 38.9211 37.7302 40.3931 37.73H57.8141Z"
          fill="#FF3C3C"
        />
      </svg>
    </div>
  );
};

export default MiratsAnimatedLogo;
