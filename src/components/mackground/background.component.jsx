import { AnimatePresence, motion } from "framer-motion";

import "./background.style.css";
const Background = ({ children, image }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delay: 0.5, duration: 1.4 },
    },
    exit: { opacity: 0, transition: { ease: "easeInOut", duration: 2, when: "beforeChildren" } },
  };
  return (
    <div className="h-screen relative overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
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
