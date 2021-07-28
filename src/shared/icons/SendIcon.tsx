import React from 'react';
import type { IconProps } from './Icons.types';

const SendIcon = ({ size, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.3324 11.5028L3.74136 2.12883C2.78963 1.73387 1.71442 1.90761 0.935398 2.58202C0.156375 3.25654 -0.169453 4.29582 0.0851716 5.29425L2.09598 13.1798H11.9411C12.3942 13.1798 12.7615 13.547 12.7615 14.0001C12.7615 14.4531 12.3942 14.8205 11.9411 14.8205H2.09598L0.0851716 22.7059C-0.169453 23.7044 0.15632 24.7437 0.935398 25.4182C1.71601 26.0939 2.79133 26.2655 3.74141 25.8714L26.3325 16.4974C27.3611 16.0706 28 15.1137 28 14.0001C28 12.8865 27.3611 11.9295 26.3324 11.5028Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SendIcon;
