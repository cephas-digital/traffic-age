import { AnimatePresence, motion } from "framer-motion";

import "./background.style.css";
const Background = ({ children, image }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      x: 0,
      transition: { delay: 0.5, duration: 2 },
    },
    exit: { opacity: 0, transition: { ease: "easeInOut", duration: 2 } },
  };
  return (
    <AnimatePresence initial={false}>
      <div className="h-screen relative overflow-hidden">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="absolute inset-0 appBackground"
          style={{
            background: `url(${image}) no-repeat center center`,
            backgroundSize: "auto 100%",
          }}
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Background;
