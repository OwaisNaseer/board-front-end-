import React from 'react';

const Line = ({ className }) => {
  return (
    <React.Fragment>
      <p className={`h-[1px] w-full bg-neutral-300 ${className}`} />
    </React.Fragment>
  );
};

export default Line;
