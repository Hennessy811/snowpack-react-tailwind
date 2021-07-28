import React from 'react';
import type { IconProps } from './Icons.types';

const CloseIcon = ({ size, className }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M13.3258 11.0005L23.7253 1.46758C24.0914 1.13195 24.0914 0.587795 23.7253 0.25221C23.3592 -0.0833758 22.7655 -0.0834188 22.3994 0.25221L11.9999 9.78515L1.60034 0.25221C1.2342 -0.0834188 0.640576 -0.0834188 0.274483 0.25221C-0.0916102 0.587838 -0.091657 1.13199 0.274483 1.46758L10.674 11.0005L0.274483 20.5334C-0.091657 20.8691 -0.091657 21.4132 0.274483 21.7488C0.457529 21.9166 0.697482 22.0005 0.937435 22.0005C1.17739 22.0005 1.41729 21.9166 1.60039 21.7488L11.9999 12.2159L22.3994 21.7488C22.5824 21.9166 22.8224 22.0005 23.0623 22.0005C23.3023 22.0005 23.5422 21.9166 23.7253 21.7488C24.0914 21.4132 24.0914 20.869 23.7253 20.5334L13.3258 11.0005Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect width="24" height="24" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CloseIcon;
