import { motion } from "framer-motion";
import { AiTwotoneSound } from "react-icons/ai";
// import song from "../../assets/sound/NY_Horn_Car_Honks_ODC-0005-196.wav";
import { useEffect, useState } from "react";

// https://www.googleapis.com/drive/v3/files/14NoLWQpgdv_oEzWSf6yGEjGjl4Grts03?alt=media&key=AIzaSyC0tBvjXnJMrgJvXZIPBBx3Ociez_y12C4=.wav

// https://drive.google.com/file/d/14NoLWQpgdv_oEzWSf6yGEjGjl4Grts03/view?usp=sharing
let song =  "https://drive.google.com/file/d/14NoLWQpgdv_oEzWSf6yGEjGjl4Grts03/edit"

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Sound = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delay: 0.7, duration: 0.6 },
    },
  };
  // const [playing, toggle] = useAudio(song);
  return (
    <motion.div
      className="flex items-center gap-2 w-fit"
      variants={container}
      initial="hidden"
      animate="show"
      // onClick={toggle}
    >
      <span className="w-6 h-6 flex items-center justify-center rounded-md bg-black text-white">
        <AiTwotoneSound size={16} />
      </span>
      <span
        className="text-sm hidden md:inline-block"
        style={{ fontFamily: "ageer" }}
      >
        Sound Off
        {/* {playing ? "On" : "Off"} */}
      </span>
    </motion.div>
  );
};

export default Sound;
