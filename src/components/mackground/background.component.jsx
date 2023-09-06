import { AnimatePresence, motion } from "framer-motion";

import "./background.style.css";
import { useEffect, useRef, useState } from "react";
const Background = ({ children, image }) => {
  const ref = useRef();
  const container = {
    // hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delay: 0.5, duration: 1.4 },
    },
    exit: {
      opacity: 0,
      transition: { ease: "easeInOut", duration: 2, when: "beforeChildren" },
    },
  };
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "style"
        ) {
          console.log("mutation", mutation);
          // Check if opacity is changing
          const currentOpacity = parseFloat(ref.current.style.opacity);
          if (currentOpacity < 1) {
            setIsFadingOut(true);
            console.log(isFadingOut);
          } else {
            setIsFadingOut(false);
            console.log(isFadingOut);
          }
        }
      }
    });
    // console.log("observer", observer);
    observer.observe(ref.current, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <div className="h-screen relative overflow-hidden">
      <div class="myloader preloader-dark">
        <div class="lds-ellipsis center cont">
          <section class="sec-loading">
            <div class="dots one">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </section>
        </div>
      </div>
      <motion.div
        ref={ref}
        variants={container}
        // initial="hidden"
        animate="show"
        exit="exit"
        className="absolute inset-0 appBackground"
        style={{
          background: `url(${image}) no-repeat center center`,
          backgroundSize: "auto 100%",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Background;
