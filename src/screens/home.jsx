import React, { useState } from "react";
import Background from "../components/mackground/background.component";

// background images
import bg1 from "../assets/bg-1.1.png";
import bg2 from "../assets/bg-2.png";
import bg3 from "../assets/bg-3.png";
import bg4 from "../assets/bg-4.png";
import bg5 from "../assets/bg-5.png";
import bg6 from "../assets/bg-6.png";
import { motion, AnimatePresence } from "framer-motion";
import Sound from "../components/sound/sound.component";
import Back from "../components/back/back.component";
import DisplayBoard from "../components/display-board/display-board.component";
import OptionButton from "../components/option-button/option-button.component";

const Home = () => {
  const [stage, setStage] = useState(1);

  const goToNext = (next) => {
    setStage(next);
  };

  return (
    <>
      {stage === 1 && <StageOne handleStage={() => goToNext(2)} />}
      {stage === 2 && <StageTwo handleStage={() => goToNext(3)} />}
      {stage === 3 && <StageTwoSub handleStage={() => goToNext(4)} />}
      {stage === 4 && <StageThree handleStage={() => goToNext(5)} />}
      {stage === 5 && <StageFour handleStage={() => goToNext(6)} />}
      {stage === 6 && <StageFourSub handleStage={() => goToNext(7)} />}
      {stage === 7 && <StageFive handleStage={() => goToNext(8)} />}
      {stage === 8 && <StageFiveSub handleStage={() => goToNext(9)} />}
      {stage === 9 && <StageSix handleStage={() => goToNext(10)} />}
      {stage === 10 && <StageSeven handleStage={() => goToNext(11)} />}
      {stage === 11 && <StageEight handleStage={() => goToNext(12)} />}
      {stage === 12 && <StageNine handleStage={() => goToNext(13)} />}
      {stage === 13 && <Calculating handleStage={() => goToNext(14)} />}
      {stage === 14 && <Result handleStage={() => goToNext(1)} />}
    </>
  );
};

export default Home;

const StageOne = ({ handleStage }) => {
  return (
    <Background image={bg1}>
      <div className="relative h-full container mx-auto px-4">
        <div className="fixed inset-0 bg-white opacity-60"></div>
        <div className="relative z-20 h-full flex flex-col items-center justify-between py-10">
          <div className="flex items-center justify-end w-full">
            <Sound />
          </div>
          <div>
            <img
              src={require("../assets/traffic-age.png")}
              alt=""
              className="h-96"
            />
            <div className="flex justify-center">
              <motion.button
                className="bg-mainDark py-2 text-white px-8 text-2xl"
                style={{ fontFamily: "ageer" }}
                onClick={handleStage}
                whileHover={{ color: "black", backgroundColor: "#FFBE48" }}
                transition={{ duration: 0.5 }}
              >
                Play now
              </motion.button>
            </div>
          </div>
          <div className="w-fit md:ml-auto">
            <p className="text-xl" style={{ fontFamily: "ageer" }}>
              Download the LagosRide App
            </p>
            <div className="flex items-center gap-2">
              <img
                src={require("../assets/playstore.png")}
                alt=""
                className="h-10"
              />
              <img
                src={require("../assets/appstore.png")}
                alt=""
                className="h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};

const StageTwo = ({ handleStage }) => {
  return (
    <Background image={bg1}>
      <div className="relative h-full container mx-auto px-4">
        <div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
          <div className="flex items-center justify-between w-full">
            <Back />
            {/* <div></div> */}
            <Sound />
          </div>
          <DisplayBoard
            question={
              <p className="text-5xl" style={{ fontFamily: "ageer" }}>
                Do you work in Lagos
                <span className="c font-sans font-black">?</span>
              </p>
            }
            options={
              <div className="flex items-center gap-4">
                <button
                  className="bg-white h-14 w-40 text-xl"
                  style={{ fontFamily: "ageer" }}
                  onClick={handleStage}
                >
                  Yes
                </button>
                <OptionButton
                  width={"w-fit px-4"}
                  color={"black"}
                  colorOne={"white"}
                  handleOption={handleStage}
                  children={
                    <span className="flex flex-col items-center">
                      No
                      <span className="text-xs">I used to work in Lagos</span>
                    </span>
                  }
                />
                <OptionButton
                  width={"w-fit px-4"}
                  color={"black"}
                  colorOne={"white"}
                  handleOption={handleStage}
                  children={
                    <span className="flex flex-col items-center">
                      No
                      <span className="text-xs">I plan to work in Lagos</span>
                    </span>
                  }
                />
              </div>
            }
          />
          <div className="w-fit md:ml-auto">
            <p className="text-xl" style={{ fontFamily: "ageer" }}>
              Download the LagosRide App
            </p>
            <div className="flex items-center gap-2">
              <img
                src={require("../assets/playstore.png")}
                alt=""
                className="h-10"
              />
              <img
                src={require("../assets/appstore.png")}
                alt=""
                className="h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};

const StageTwoSub = ({ handleStage }) => {
  setTimeout(() => handleStage(), [5000]);
  const popUp = {
    hidden: { y: 100000 },
    show: {
      y: 1,
      transition: { duration: 2, delay: 2 },
    },
  };
  return (
    <AnimatePresence>
      <Background image={bg1}>
        <div className="relative h-full container mx-auto px-4">
          <div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
            <div className="flex items-center justify-between w-full">
              <Back />
              {/* <div></div> */}
              <Sound />
            </div>
            <div className="w-fit md:ml-auto">
              <p className="text-xl" style={{ fontFamily: "ageer" }}>
                Download the LagosRide App
              </p>
              <div className="flex items-center gap-2">
                <img
                  src={require("../assets/playstore.png")}
                  alt=""
                  className="h-10"
                />
                <img
                  src={require("../assets/appstore.png")}
                  alt=""
                  className="h-10"
                />
              </div>
            </div>
          </div>

          <motion.img
            src={require("../assets/oshey.png")}
            alt=""
            className="h-32 fixed bottom-32 left-8"
            variants={popUp}
            initial="hidden"
            animate="show"
          />
        </div>
      </Background>
    </AnimatePresence>
  );
};

const StageThree = ({ handleStage }) => {
  const [option, setOption] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delay: 0.7, duration: 0.6 },
    },
  };

  const otherOptions = () => {
    if (option === false) {
      setOption(1);
      return;
    }
    handleStage();
  };
  return (
    <Background image={bg2}>
      <div className="relative h-full container mx-auto px-4">
        {/* <div className="fixed inset-0 bg-white opacity-60"></div> */}
        <div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
          <div className="flex items-center justify-between w-full">
            <Back />
            <div></div>
            <Sound />
          </div>
          <div>
            <DisplayBoard
              question={
                <p className="text-4xl" style={{ fontFamily: "ageer" }}>
                  How long have you worked in Lagos
                  <span className="c font-sans font-black">?</span>
                </p>
              }
              options={
                <div>
                  <div className="flex items-center gap-4 justify-center flex-wrap">
                    <OptionButton
                      width={"w-fit px-4"}
                      color={"black"}
                      colorOne={"white"}
                      children={
                        <span className="flex flex-col items-center">
                          <span className="fs font-sans text-xs font-black">
                            1
                          </span>
                          <span className="text-xs">Year</span>
                        </span>
                      }
                    />
                    <OptionButton
                      width={"w-fit px-4"}
                      colorOne={"white"}
                      color={"black"}
                      children={
                        <span className="flex flex-col items-center">
                          <span className="fs font-sans text-xs font-black">
                            2
                          </span>
                          <span className="text-xs">Year</span>
                        </span>
                      }
                    />
                    <OptionButton
                      width={"w-fit px-4"}
                      colorOne={"white"}
                      color={"black"}
                      children={
                        <span className="flex flex-col items-center">
                          <span className="fs font-sans text-xs font-black">
                            3
                          </span>
                          <span className="text-xs">Year</span>
                        </span>
                      }
                    />
                    <OptionButton
                      width={"w-fit px-4"}
                      colorOne={"white"}
                      color={"black"}
                      children={
                        <span className="flex flex-col items-center">
                          <span className="fs font-sans text-xs font-black">
                            4
                          </span>
                          <span className="text-xs">Year</span>
                        </span>
                      }
                    />
                  </div>
                  <div className="flex justify-center mt-4 gap-4">
                    <OptionButton
                      width={"w-fit px-4"}
                      color={"white"}
                      colorOne={"#14AE5C"}
                      bgStart={"white"  }
                      handleOption={otherOptions}
                      children={
                        <span className="flex flex-col items-center text-lg">
                          <span>
                            Others
                            <span className="fs font-san font-black"></span>
                          </span>
                          <span className="text-xs">Please specify</span>
                        </span>
                      }
                    />
                    {option && (
                      <motion.div
                        className="flex items-center gap-2 text-white text-md relative"
                        style={{ fontFamily: "ageer" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.9 }}
                      >
                        <div className="absolute inset-0 border-b skew-x-12 -rotate-6 mb-2"></div>
                        <div className="absolute inset-0 border-b skew-x-12 mb-1"></div>
                        <div className="absolute inset-0 border-b -skew-x-6 ml-2 mb-1 rotate-3"></div>
                        <input
                          type="text"
                          className="bg-transparent w-10 border-none relative z-20 font-sans font-black outline-0 outline-transparent"
                          placeholder="2"
                        />
                        Years
                      </motion.div>
                    )}
                  </div>
                </div>
              }
            />
          </div>
          <div className="w-fit md:ml-auto">
            <p className="text-xl" style={{ fontFamily: "ageer" }}>
              Download the LagosRide App
            </p>
            <div className="flex items-center gap-2">
              <img
                src={require("../assets/playstore.png")}
                alt=""
                className="h-10"
              />
              <img
                src={require("../assets/appstore.png")}
                alt=""
                className="h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};

const StageFour = ({ handleStage }) => {
  return (
    <Background image={bg3}>
      <div className="relative h-full container mx-auto px-4">
        {/* <div className="fixed inset-0 bg-white opacity-60"></div> */}
        <div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
          <div className="flex items-center justify-between w-full">
            <Back />
            {/* <div></div> */}
            <Sound />
          </div>
          <DisplayBoard
            question={
              <p
                className="text-4xl text-center"
                style={{ fontFamily: "ageer" }}
              >
                Which part of lagos do you <br /> live
                <span className="c font-sans font-black">?</span>
              </p>
            }
            options={
              <div className="flex items-center justify-center gap-4">
                <OptionButton
                  width={"w-fit px-4"}
                  color={"black"}
                  colorOne={"white"}
                  handleOption={handleStage}
                  children={
                    <span className="flex flex-col items-center">Mainland</span>
                  }
                />
                <OptionButton
                  width={"w-fit px-4"}
                  color={"black"}
                  colorOne={"white"}
                  handleOption={handleStage}
                  children={
                    <span className="flex flex-col items-center">Island</span>
                  }
                />
              </div>
            }
          />
          <div className="w-fit md:ml-auto">
            <p className="text-xl" style={{ fontFamily: "ageer" }}>
              Download the LagosRide App
            </p>
            <div className="flex items-center gap-2">
              <img
                src={require("../assets/playstore.png")}
                alt=""
                className="h-10"
              />
              <img
                src={require("../assets/appstore.png")}
                alt=""
                className="h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};
const StageFourSub = ({ handleStage }) => {
  setTimeout(() => handleStage(), [5000]);
  const popUp = {
    hidden: { y: 100000 },
    show: {
      y: 1,
      transition: { duration: 2, delay: 2 },
    },
  };
  return (
    <AnimatePresence>
      <Background image={bg3}>
        <div className="relative h-full container mx-auto px-4">
          <div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
            <div className="flex items-center justify-between w-full">
              <Back />
              {/* <div></div> */}
              <Sound />
            </div>
            <div className="w-fit md:ml-auto">
              <p className="text-xl" style={{ fontFamily: "ageer" }}>
                Download the LagosRide App
              </p>
              <div className="flex items-center gap-2">
                <img
                  src={require("../assets/playstore.png")}
                  alt=""
                  className="h-10"
                />
                <img
                  src={require("../assets/appstore.png")}
                  alt=""
                  className="h-10"
                />
              </div>
            </div>
          </div>

          <motion.img
            src={require("../assets/oshey.png")}
            alt=""
            className="h-32 fixed bottom-32 left-8"
            variants={popUp}
            initial="hidden"
            animate="show"
          />
        </div>
      </Background>
    </AnimatePresence>
  );
};
const StageFive = ({ handleStage }) => {
  return (
    <Background image={bg3}>
      <div className="relative h-full container mx-auto px-4">
        {/* <div className="fixed inset-0 bg-white opacity-60"></div> */}
        <div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
          <div className="flex items-center justify-between w-full">
            <Back />
            {/* <div></div> */}
            <Sound />
          </div>
          <DisplayBoard
            question={
              <p
                className="text-4xl text-center"
                style={{ fontFamily: "ageer" }}
              >
                Which part of lagos do your <br /> work place
                <span className="c font-sans font-black">?</span>
              </p>
            }
            options={
              <div className="flex items-center justify-center gap-4">
                <OptionButton
                  width={"w-fit px-4"}
                  color={"black"}
                  colorOne={"white"}
                  handleOption={handleStage}
                  children={
                    <span className="flex flex-col items-center">Mainland</span>
                  }
                />
                <OptionButton
                  width={"w-fit px-4"}
                  color={"black"}
                  colorOne={"white"}
                  handleOption={handleStage}
                  children={
                    <span className="flex flex-col items-center">Island</span>
                  }
                />
              </div>
            }
          />
          <div className="w-fit md:ml-auto">
            <p className="text-xl" style={{ fontFamily: "ageer" }}>
              Download the LagosRide App
            </p>
            <div className="flex items-center gap-2">
              <img
                src={require("../assets/playstore.png")}
                alt=""
                className="h-10"
              />
              <img
                src={require("../assets/appstore.png")}
                alt=""
                className="h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};
const StageFiveSub = ({ handleStage }) => {
  setTimeout(() => handleStage(), [5000]);
  const popUp = {
    hidden: { y: 100000 },
    show: {
      y: 1,
      transition: { duration: 2, delay: 2 },
    },
  };
  return (
    <AnimatePresence>
      <Background image={bg3}>
        <div className="relative h-full container mx-auto px-4">
          <div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
            <div className="flex items-center justify-between w-full">
              <Back />
              {/* <div></div> */}
              <Sound />
            </div>
            <div className="w-fit md:ml-auto">
              <p className="text-xl" style={{ fontFamily: "ageer" }}>
                Download the LagosRide App
              </p>
              <div className="flex items-center gap-2">
                <img
                  src={require("../assets/playstore.png")}
                  alt=""
                  className="h-10"
                />
                <img
                  src={require("../assets/appstore.png")}
                  alt=""
                  className="h-10"
                />
              </div>
            </div>
          </div>

          <motion.img
            src={require("../assets/oshey.png")}
            alt=""
            className="h-32 fixed bottom-32 left-8"
            variants={popUp}
            initial="hidden"
            animate="show"
          />
        </div>
      </Background>
    </AnimatePresence>
  );
};
const StageSix = ({ handleStage }) => {
  const [option, setOption] = useState(false);
  const otherOptions = () => {
    if (option === false) {
      setOption(1);
      return;
    }
    handleStage();
  };
  return (
    <Background image={bg4}>
      <div className="relative h-full container mx-auto px-4">
        {/* <div className="fixed inset-0 bg-white opacity-60"></div> */}
        <div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
          <div className="flex items-center justify-between w-full">
            <Back />
            {/* <div></div> */}
            <Sound />
          </div>
          <DisplayBoard
            question={
              <p
                className="text-4xl text-center"
                style={{ fontFamily: "ageer" }}
              >
                What time do you resume <br /> work
                <span className="c font-sans font-black">?</span>
              </p>
            }
            options={
              <div>
                <div className="flex items-center justify-center gap-4">
                  <OptionButton
                    width={"w-fit px-4"}
                    color={"black"}
                    colorOne={"white"}
                    handleOption={handleStage}
                    children={
                      <span className="flex flex-col items-center">
                        <span className="c font-sans font-black">07:00</span>
                        <span className="text-xs">AM</span>
                      </span>
                    }
                  />
                  <OptionButton
                    width={"w-fit px-4"}
                    color={"black"}
                    colorOne={"white"}
                    handleOption={handleStage}
                    children={
                      <span className="flex flex-col items-center">
                        <span className="c font-sans font-black">08:00</span>
                        <span className="text-xs">AM</span>
                      </span>
                    }
                  />
                  <OptionButton
                    width={"w-fit px-4"}
                    color={"black"}
                    colorOne={"white"}
                    handleOption={handleStage}
                    children={
                      <span className="flex flex-col items-center">
                        <span className="c font-sans font-black">09:00</span>
                        <span className="text-xs">AM</span>
                      </span>
                    }
                  />
                  <OptionButton
                    width={"w-fit px-4"}
                    color={"black"}
                    colorOne={"white"}
                    handleOption={handleStage}
                    children={
                      <span className="flex flex-col items-center">
                        <span className="c font-sans font-black">10:00</span>
                        <span className="text-xs">AM</span>
                      </span>
                    }
                  />
                </div>
                <div className="flex justify-center mt-4 gap-4">
                  <OptionButton
                    width={"w-fit px-4"}
                    color={"black"}
                    colorOne={"white"}
                    // bgStart={"white"}
                    handleOption={otherOptions}
                    children={
                      <span className="flex flex-col items-center text-lg">
                        <span>
                          Others
                          <span className="fs font-sans font-black">:</span>
                        </span>
                        {/* <span className="text-xs">Please specify</span> */}
                      </span>
                    }
                  />
                  {option && (
                    <motion.div
                      className="flex items-center gap-2 text-white text-md relative"
                      style={{ fontFamily: "ageer" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.9 }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 border-b skew-x-12 -rotate-6 mb-2 opacity-30"></div>
                        <div className="absolute inset-0 border-b skew-x-12 mb-1 opacity-30"></div>
                        <div className="absolute inset-0 border-b -skew-x-6 ml-2 mb-1 rotate-3 opacity-30"></div>
                        <input
                          type="text"
                          className="bg-transparent w-12 border-none relative z-20 font-sans font-black outline-0 outline-transparent"
                          placeholder="00"
                        />
                      </div>
                      <span className="c font-sans font-extrabold">:</span>
                      <div className="relative">
                        <div className="absolute inset-0 border-b skew-x-12 -rotate-6 mb-2 opacity-30"></div>
                        <div className="absolute inset-0 border-b skew-x-12 mb-1 opacity-30"></div>
                        <div className="absolute inset-0 border-b -skew-x-6 ml-2 mb-1 rotate-3 opacity-30"></div>
                        <input
                          type="text"
                          className="bg-transparent w-12 border-none relative z-20 font-sans font-black outline-0 outline-transparent"
                          placeholder="00"
                        />
                      </div>
                      <select className="bg-transparent w-12 border-none relative z-20 outline-0 outline-transparent">
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                      </select>
                    </motion.div>
                  )}
                </div>
              </div>
            }
          />
          <div className="w-fit md:ml-auto">
            <p className="text-xl" style={{ fontFamily: "ageer" }}>
              Download the LagosRide App
            </p>
            <div className="flex items-center gap-2">
              <img
                src={require("../assets/playstore.png")}
                alt=""
                className="h-10"
              />
              <img
                src={require("../assets/appstore.png")}
                alt=""
                className="h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};
const StageSeven = ({ handleStage }) => {
  const [option, setOption] = useState(false);
  const otherOptions = () => {
    if (option === false) {
      setOption(1);
      return;
    }
    handleStage();
  };
  return (
    <Background image={bg4}>
      <div className="relative h-full container mx-auto px-4">
        {/* <div className="fixed inset-0 bg-white opacity-60"></div> */}
        <div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
          <div className="flex items-center justify-between w-full">
            <Back />
            {/* <div></div> */}
            <Sound />
          </div>
          <DisplayBoard
            question={
              <p
                className="text-4xl text-center"
                style={{ fontFamily: "ageer" }}
              >
                What time do you resume <br /> work
                <span className="c font-sans font-black">?</span>
              </p>
            }
            options={
              <div>
                <div className="flex items-center justify-center gap-4">
                  <OptionButton
                    width={"w-fit px-4"}
                    color={"black"}
                    colorOne={"white"}
                    handleOption={handleStage}
                    children={
                      <span className="flex flex-col items-center">
                        <span className="c font-sans font-black">07:00</span>
                        <span className="text-xs">AM</span>
                      </span>
                    }
                  />
                  <OptionButton
                    width={"w-fit px-4"}
                    color={"black"}
                    colorOne={"white"}
                    handleOption={handleStage}
                    children={
                      <span className="flex flex-col items-center">
                        <span className="c font-sans font-black">08:00</span>
                        <span className="text-xs">AM</span>
                      </span>
                    }
                  />
                  <OptionButton
                    width={"w-fit px-4"}
                    color={"black"}
                    colorOne={"white"}
                    handleOption={handleStage}
                    children={
                      <span className="flex flex-col items-center">
                        <span className="c font-sans font-black">09:00</span>
                        <span className="text-xs">AM</span>
                      </span>
                    }
                  />
                  <OptionButton
                    width={"w-fit px-4"}
                    color={"black"}
                    colorOne={"white"}
                    handleOption={handleStage}
                    children={
                      <span className="flex flex-col items-center">
                        <span className="c font-sans font-black">10:00</span>
                        <span className="text-xs">AM</span>
                      </span>
                    }
                  />
                </div>
                <div className="flex justify-center mt-4 gap-4">
                  <OptionButton
                    width={"w-fit px-4"}
                    color={"black"}
                    colorOne={"white"}
                    // bgStart={"white"}
                    handleOption={otherOptions}
                    children={
                      <span className="flex flex-col items-center text-lg">
                        <span>
                          Others
                          <span className="fs font-sans font-black">:</span>
                        </span>
                        {/* <span className="text-xs">Please specify</span> */}
                      </span>
                    }
                  />
                  {option && (
                    <motion.div
                      className="flex items-center gap-2 text-white text-md relative"
                      style={{ fontFamily: "ageer" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.9 }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 border-b skew-x-12 -rotate-6 mb-2 opacity-30"></div>
                        <div className="absolute inset-0 border-b skew-x-12 mb-1 opacity-30"></div>
                        <div className="absolute inset-0 border-b -skew-x-6 ml-2 mb-1 rotate-3 opacity-30"></div>
                        <input
                          type="text"
                          className="bg-transparent w-12 border-none relative z-20 font-sans font-black outline-0 outline-transparent"
                          placeholder="00"
                        />
                      </div>
                      <span className="c font-sans font-extrabold">:</span>
                      <div className="relative">
                        <div className="absolute inset-0 border-b skew-x-12 -rotate-6 mb-2 opacity-30"></div>
                        <div className="absolute inset-0 border-b skew-x-12 mb-1 opacity-30"></div>
                        <div className="absolute inset-0 border-b -skew-x-6 ml-2 mb-1 rotate-3 opacity-30"></div>
                        <input
                          type="text"
                          className="bg-transparent w-12 border-none relative z-20 font-sans font-black outline-0 outline-transparent"
                          placeholder="00"
                        />
                      </div>
                      <select className="bg-transparent w-12 border-none relative z-20 outline-0 outline-transparent">
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                      </select>
                    </motion.div>
                  )}
                </div>
              </div>
            }
          />
          <div className="w-fit md:ml-auto">
            <p className="text-xl" style={{ fontFamily: "ageer" }}>
              Download the LagosRide App
            </p>
            <div className="flex items-center gap-2">
              <img
                src={require("../assets/playstore.png")}
                alt=""
                className="h-10"
              />
              <img
                src={require("../assets/appstore.png")}
                alt=""
                className="h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};
const StageEight = ({ handleStage }) => {
  const [option, setOption] = useState(false);
  const otherOptions = () => {
    if (option === false) {
      setOption(1);
      return;
    }
    handleStage();
  };
  return (
    <Background image={bg5}>
      <div className="relative h-full container mx-auto px-4">
        {/* <div className="fixed inset-0 bg-white opacity-60"></div> */}
        <div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
          <div className="flex items-center justify-between w-full">
            <Back />
            {/* <div></div> */}
            <Sound />
          </div>
          <DisplayBoard
            question={
              <p
                className="text-4xl text-center"
                style={{ fontFamily: "ageer" }}
              >
                What time do you close from
                <br />
                work
                <span className="c font-sans font-black">?</span>
              </p>
            }
            options={
              <div>
                <div className="flex items-center justify-center gap-4">
                  <OptionButton
                    width={"w-fit px-4"}
                    color={"black"}
                    colorOne={"white"}
                    handleOption={handleStage}
                    children={
                      <span className="flex flex-col items-center">
                        <span className="c font-sans font-black">03:00</span>
                        <span className="text-xs">PM</span>
                      </span>
                    }
                  />
                  <OptionButton
                    width={"w-fit px-4"}
                    color={"black"}
                    colorOne={"white"}
                    handleOption={handleStage}
                    children={
                      <span className="flex flex-col items-center">
                        <span className="c font-sans font-black">04:00</span>
                        <span className="text-xs">PM</span>
                      </span>
                    }
                  />
                  <OptionButton
                    width={"w-fit px-4"}
                    color={"black"}
                    colorOne={"white"}
                    handleOption={handleStage}
                    children={
                      <span className="flex flex-col items-center">
                        <span className="c font-sans font-black">05:00</span>
                        <span className="text-xs">PM</span>
                      </span>
                    }
                  />
                  <OptionButton
                    width={"w-fit px-4"}
                    color={"black"}
                    colorOne={"white"}
                    handleOption={handleStage}
                    children={
                      <span className="flex flex-col items-center">
                        <span className="c font-sans font-black">06:00</span>
                        <span className="text-xs">PM</span>
                      </span>
                    }
                  />
                </div>
                <div className="flex justify-center mt-4 gap-4">
                  <OptionButton
                    width={"w-fit px-4"}
                    color={"black"}
                    colorOne={"white"}
                    // bgStart={"white"}
                    handleOption={otherOptions}
                    children={
                      <span className="flex flex-col items-center text-lg">
                        <span>
                          Others
                          <span className="fs font-sans font-black">:</span>
                        </span>
                        {/* <span className="text-xs">Please specify</span> */}
                      </span>
                    }
                  />
                  {option && (
                    <motion.div
                      className="flex items-center gap-2 text-white text-md relative"
                      style={{ fontFamily: "ageer" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.9 }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 border-b skew-x-12 -rotate-6 mb-2 opacity-30"></div>
                        <div className="absolute inset-0 border-b skew-x-12 mb-1 opacity-30"></div>
                        <div className="absolute inset-0 border-b -skew-x-6 ml-2 mb-1 rotate-3 opacity-30"></div>
                        <input
                          type="text"
                          className="bg-transparent w-12 border-none relative z-20 font-sans font-black outline-0 outline-transparent"
                          placeholder="00"
                        />
                      </div>
                      <span className="c font-sans font-extrabold">:</span>
                      <div className="relative">
                        <div className="absolute inset-0 border-b skew-x-12 -rotate-6 mb-2 opacity-30"></div>
                        <div className="absolute inset-0 border-b skew-x-12 mb-1 opacity-30"></div>
                        <div className="absolute inset-0 border-b -skew-x-6 ml-2 mb-1 rotate-3 opacity-30"></div>
                        <input
                          type="text"
                          className="bg-transparent w-12 border-none relative z-20 font-sans font-black outline-0 outline-transparent"
                          placeholder="00"
                        />
                      </div>
                      <select className="bg-transparent w-12 border-none relative z-20 outline-0 outline-transparent">
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                      </select>
                    </motion.div>
                  )}
                </div>
              </div>
            }
          />
          <div className="w-fit md:ml-auto">
            <p className="text-xl" style={{ fontFamily: "ageer" }}>
              Download the LagosRide App
            </p>
            <div className="flex items-center gap-2">
              <img
                src={require("../assets/playstore.png")}
                alt=""
                className="h-10"
              />
              <img
                src={require("../assets/appstore.png")}
                alt=""
                className="h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};
const StageNine = ({ handleStage }) => {
  const [option, setOption] = useState(false);
  const otherOptions = () => {
    if (option === false) {
      setOption(1);
      return;
    }
    handleStage();
  };
  return (
    <Background image={bg5}>
      <div className="relative h-full container mx-auto px-4">
        {/* <div className="fixed inset-0 bg-white opacity-60"></div> */}
        <div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
          <div className="flex items-center justify-between w-full">
            <Back />
            {/* <div></div> */}
            <Sound />
          </div>
          <DisplayBoard
            question={
              <p
                className="text-4xl text-center"
                style={{ fontFamily: "ageer" }}
              >
                What time do you get home
                <span className="c font-sans font-black">?</span>
              </p>
            }
            options={
              <div>
                <div className="flex items-center justify-center gap-4">
                  <OptionButton
                    width={"w-fit px-4"}
                    color={"black"}
                    colorOne={"white"}
                    handleOption={handleStage}
                    children={
                      <span className="flex flex-col items-center">
                        <span className="c font-sans font-black">03:00</span>
                        <span className="text-xs">PM</span>
                      </span>
                    }
                  />
                  <OptionButton
                    width={"w-fit px-4"}
                    color={"black"}
                    colorOne={"white"}
                    handleOption={handleStage}
                    children={
                      <span className="flex flex-col items-center">
                        <span className="c font-sans font-black">04:00</span>
                        <span className="text-xs">PM</span>
                      </span>
                    }
                  />
                  <OptionButton
                    width={"w-fit px-4"}
                    color={"black"}
                    colorOne={"white"}
                    handleOption={handleStage}
                    children={
                      <span className="flex flex-col items-center">
                        <span className="c font-sans font-black">05:00</span>
                        <span className="text-xs">PM</span>
                      </span>
                    }
                  />
                  <OptionButton
                    width={"w-fit px-4"}
                    color={"black"}
                    colorOne={"white"}
                    handleOption={handleStage}
                    children={
                      <span className="flex flex-col items-center">
                        <span className="c font-sans font-black">06:00</span>
                        <span className="text-xs">PM</span>
                      </span>
                    }
                  />
                </div>
                <div className="flex justify-center mt-4 gap-4">
                  <OptionButton
                    width={"w-fit px-4"}
                    color={"black"}
                    colorOne={"white"}
                    // bgStart={"white"}
                    handleOption={otherOptions}
                    children={
                      <span className="flex flex-col items-center text-lg">
                        <span>
                          Others
                          <span className="fs font-sans font-black">:</span>
                        </span>
                        {/* <span className="text-xs">Please specify</span> */}
                      </span>
                    }
                  />
                  {option && (
                    <motion.div
                      className="flex items-center gap-2 text-white text-md relative"
                      style={{ fontFamily: "ageer" }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.9 }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 border-b skew-x-12 -rotate-6 mb-2 opacity-30"></div>
                        <div className="absolute inset-0 border-b skew-x-12 mb-1 opacity-30"></div>
                        <div className="absolute inset-0 border-b -skew-x-6 ml-2 mb-1 rotate-3 opacity-30"></div>
                        <input
                          type="text"
                          className="bg-transparent w-12 border-none relative z-20 font-sans font-black outline-0 outline-transparent"
                          placeholder="00"
                        />
                      </div>
                      <span className="c font-sans font-extrabold">:</span>
                      <div className="relative">
                        <div className="absolute inset-0 border-b skew-x-12 -rotate-6 mb-2 opacity-30"></div>
                        <div className="absolute inset-0 border-b skew-x-12 mb-1 opacity-30"></div>
                        <div className="absolute inset-0 border-b -skew-x-6 ml-2 mb-1 rotate-3 opacity-30"></div>
                        <input
                          type="text"
                          className="bg-transparent w-12 border-none relative z-20 font-sans font-black outline-0 outline-transparent"
                          placeholder="00"
                        />
                      </div>
                      <select className="bg-transparent w-12 border-none relative z-20 outline-0 outline-transparent">
                        <option value="am">AM</option>
                        <option value="pm">PM</option>
                      </select>
                    </motion.div>
                  )}
                </div>
              </div>
            }
          />
          <div className="w-fit md:ml-auto">
            <p className="text-xl" style={{ fontFamily: "ageer" }}>
              Download the LagosRide App
            </p>
            <div className="flex items-center gap-2">
              <img
                src={require("../assets/playstore.png")}
                alt=""
                className="h-10"
              />
              <img
                src={require("../assets/appstore.png")}
                alt=""
                className="h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};
const Calculating = ({ handleStage }) => {
  setTimeout(() => handleStage(), [5000]);
  return (
    <Background image={bg6}>
      <div className="relative h-full container mx-auto px-4">
        {/* <div className="fixed inset-0 bg-white opacity-60"></div> */}
        <div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
          <div className="flex items-center justify-between w-full">
            <Back />
            {/* <div></div> */}
            <Sound />
          </div>
          <DisplayBoard
            width={"max-w-xl mx-auto"}
            question={
              <p
                className="text-4xl text-center"
                style={{ fontFamily: "ageer" }}
              >
                Calculating
              </p>
            }
          />
          <div className="w-fit md:ml-auto">
            <p className="text-xl" style={{ fontFamily: "ageer" }}>
              Download the LagosRide App
            </p>
            <div className="flex items-center gap-2">
              <img
                src={require("../assets/playstore.png")}
                alt=""
                className="h-10"
              />
              <img
                src={require("../assets/appstore.png")}
                alt=""
                className="h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};
const Result = ({ handleStage }) => {
  return (
    <Background image={bg6}>
      <div className="relative h-full container mx-auto px-4">
        <div className="fixed inset-0 bg-white opacity-60"></div>
        <div className="relative z-20 h-full flex flex-col items-center justify-between py-10">
          <div className="flex items-center justify-end w-full">
            <Sound />
          </div>
          <div className="w-full">
            <img
              src={require("../assets/odogwu.png")}
              alt=""
              className="h-60 mx-auto"
            />
            <div className="text-center mb-4" style={{ fontFamily: "ageer" }}>
              <p>
                Your traffic age is
                <span className="font-sans font-black">:</span>
              </p>
              <div className="bg-black text-white py-4 max-w-4xl mx-auto my-2">
                {" "}
                <span className="font-sans font-black">3</span> years
              </div>
            </div>
            <div className="flex justify-center items-center gap-8">
              <motion.button
                className="bg-mainDark py-2 text-white px-8 text-2xl"
                style={{ fontFamily: "ageer" }}
                onClick={handleStage}
                whileHover={{ color: "black", backgroundColor: "#FFBE48" }}
                transition={{ duration: 0.5 }}
              >
                Play again
              </motion.button>
              <motion.button
                className="bg-white py-2 text-mainDark px-8 text-2xl border border-mainDark"
                style={{ fontFamily: "ageer" }}
                onClick={handleStage}
                whileHover={{ color: "black", backgroundColor: "#FFBE48" }}
                transition={{ duration: 0.5 }}
              >
                Share
              </motion.button>
            </div>
          </div>
          <div className="w-fit md:ml-auto">
            <p className="text-xl" style={{ fontFamily: "ageer" }}>
              Download the LagosRide App
            </p>
            <div className="flex items-center gap-2">
              <img
                src={require("../assets/playstore.png")}
                alt=""
                className="h-10"
              />
              <img
                src={require("../assets/appstore.png")}
                alt=""
                className="h-10"
              />
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
};
