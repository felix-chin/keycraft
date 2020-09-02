import React, { useLayoutEffect } from 'react';

export default function Disclaimer(props) {
  useLockBodyScroll();
  return (
    <div className={'disclaimer d-flex'}>
      <div className="disclaimer-content text-white p-3">
        <p>This application is for demonstration purposes only and does not allow for real world transactions.<br />
          By clicking the button below, you acknowledge that you have read and understand this disclaimer.</p>
        <button onClick={props.closeDisclaimer} className="btn">
          Acknowledge
        </button>
      </div>
    </div>
  );
}

function useLockBodyScroll() {
  useLayoutEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';
    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []); // Empty array ensures effect is only run on mount and unmount
}
