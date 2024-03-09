'use client';

import { useState } from 'react';

function Flipper({ children, className }: { children: React.ReactNode, className: string }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`flipper-container relative mx-auto cursor-pointer ${className}`} >
      <div className={`flipper absolute inset-0 ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
        {children}
      </div>
    </div>
  );
}

export default Flipper;
