"use client";
import { useEffect, useRef, useState } from "react";
import Scrollbar from "smooth-scrollbar";
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';



// Mobile Plugin for scroll speed adjustment
class MobilePlugin extends Scrollbar.ScrollbarPlugin {
  static pluginName = 'filterEvent';
  static defaultOptions = {
    speed: 0.5,
  };

  transformDelta(delta: { x: number; y: number }, fromEvent: TouchEvent | WheelEvent) {
    if (fromEvent.type === 'touchmove' || fromEvent.type === 'scroll') {
      //console.log('Touch event detected:');
      return delta;
    } else if (fromEvent.type === 'touchend') {
      //console.log('Touch event detected:', fromEvent);
      return {
        x: delta.x,
        y: delta.y * this.options.speed,
      };
    }
    return delta;
  }
}

// Initialize plugins once, at the top level, to comply with the React hook rules


const ScrollContainer = ({ children }: { children: React.ReactNode }) => {
  const scrollbarRef = useRef<Scrollbar | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  Scrollbar.use(OverscrollPlugin);
  Scrollbar.use(MobilePlugin);

  // Detect mobile vs desktop
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsMobile(mq.matches);

    const update = () => setIsMobile(mq.matches);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    // Initialize Scrollbar inside useEffect (this is fine)
    const container = document.querySelector('#scroll-container') as HTMLElement;

    if (container) {
      const ScrollbarOptions = {
        damping: 0.08,
        thumbMinSize: 5,
        renderByPixel: true,
        alwaysShowTracks: true,
        continuousScrolling: true,
        plugins: {
          overscroll: {
            effect: 'bounce',
            damping: 0.10,
            maxOverscroll: 80,
          },
          mobile: {
            speed: 0.001,
          },
        },
      };

      scrollbarRef.current = Scrollbar.init(container, ScrollbarOptions);
    }

    return () => {
      if (scrollbarRef.current) {
        scrollbarRef.current.destroy();
        scrollbarRef.current = null;
      }
    };
  }, [isMobile]); // Re-run effect when isMobile changes

  return (
    <div
      id="scroll-container"
      style={{
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
        touchAction: "none",
        scrollBehavior: 'smooth',
      }}
    >
      {children}
    </div>
  );
};

export default ScrollContainer;
