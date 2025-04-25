import { useEffect } from 'react';
import Scrollbar from 'smooth-scrollbar';

const InertiaScrollComponent = () => {
  useEffect(() => {
    // Initialize Smooth Scrollbar on the client-side
    const scrollContainer = document.querySelector('#scroll-container') as HTMLElement;
    if (scrollContainer) {
      const scrollbar = Scrollbar.init(scrollContainer, {
        damping: 0.08, // Lower values give a longer inertia effect
      });
      // Cleanup on unmount
      return () => {
        scrollbar.destroy();
      };
    }
  }, []);

  return (
    <div
      id="scroll-container"
      style={{ height: '100vh', overflow: 'hidden' }}
    >
      {/* Your scrollable content goes here */}
      <div style={{ height: '200vh', padding: '20px' }}>
        <h1>Inertial Scrolling Content</h1>
        <p>Scroll down to see the inertia effect in action.</p>
      </div>
    </div>
  );
};

export default InertiaScrollComponent;
