import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const OptionButton = ({
  handleOption,
  children,
  width,
  color,
  colorOne,
  bgStart,
}) => {
  const [shadow, setShadow] = useState(false);
  const x = useMotionValue(0);
  const baordChildOne = {
    hidden: {
      opacity: 0,
    },
    show: {
      rotate: -4,
      backgroundColor: "#FFBE48",
      opacity: 0.4,
      transition: {
        duration: 0.8,
      },
    },
  };
  const baordChildTwo = {
    hidden: {
      opacity: 0,
    },
    show: {
      rotate: 4,
      backgroundColor: "#FFBE48",
      //   scale: x,
      opacity: 0.4,
      transition: {
        duration: 0.8,
      },
    },
  };
  //   useMotionValueEvent(x, "change", (latest) => {
  //     console.log("x changed to", latest);
  //   });
  return (
    <motion.button
      className={`py-2 border relative border-white text-2xl hover:border-transparent ${width || "w-40"}`}
      style={{ fontFamily: "ageer", color: colorOne, backgroundColor: bgStart }}
      initial={{ color: colorOne, backgroundColor: bgStart }}
      onClick={handleOption}
      whileHover={{ color: color, backgroundColor: "#FFBE48" }}
      whileTap={{ scaleX: 2 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      onHoverStart={(e) => setShadow(true)}
      onHoverEnd={() => setShadow(false)}
    >
      {/* {shadow && (
        <motion.div
          className="absolute inset-0"
          variants={baordChildOne}
          initial="hidden"
          animate="show"
        />
      )} */}
      {shadow && (
        <motion.div
          className="absolute inset-0"
          variants={baordChildOne}
          initial="hidden"
          animate="show"
        />
      )}
      {shadow && (
        <motion.div
          className="absolute inset-0"
          variants={baordChildTwo}
          initial="hidden"
          animate="show"
        />
      )}
      <div className="relative z-40">{children}</div>
    </motion.button>
  );
};

export default OptionButton;
