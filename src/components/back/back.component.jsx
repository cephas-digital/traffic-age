import { IoCaretBack } from "react-icons/io5";
import { motion } from "framer-motion";

const Back = ({ goBack }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delay: 0.7, duration: 0.6 },
    },
  };
  return (
    <motion.div
      className="flex items-center gap-2 w-fit"
      variants={container}
      initial="hidden"
      animate="show"
      onClick={goBack}
    >
      <span className="w-6 h-6 flex items-center justify-center rounded-md bg-black text-white">
        <IoCaretBack size={16} />
      </span>
      <span
        className="text-sm hidden md:inline-block"
        style={{ fontFamily: "ageer" }}
      >
        Back
      </span>
    </motion.div>
  );
};

export default Back;
