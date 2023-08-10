import { motion } from "framer-motion";

const DisplayBoard = ({ question, options, width }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delay: 0.7, duration: 0.6 },
    },
  };
  const baordChildOne = {
    show: {
      rotate: [-3, 3, -3],
      transition: {
        duration: 2,
        // ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };
  const baordChildTwo = {
    show: {
      rotate: [3, -3, 3],
      transition: {
        duration: 2,
        // ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };
  return (
    <div className="w-full max-w-2xl">
      <motion.div
        className={`relative p-10`}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="absolute inset-0 bg-black opacity-70 z-20"></div>
        <motion.div
          className="absolute inset-0 bg-black opacity-40 z-50"
          variants={baordChildOne}
          animate="show"
        />
        <motion.div
          className="absolute inset-0 bg-black opacity-40"
          variants={baordChildTwo}
          animate="show"
        />
        <div className="relative z-50">
          <div className="py-10 text-center text-white">{question}</div>
          {/* <div className="flex items-center justify-center gap-4"> */}
          {options}
          {/* </div> */}
        </div>
      </motion.div>
    </div>
  );
};

export default DisplayBoard;
