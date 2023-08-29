import React, { useState, useEffect } from "react";
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
import DownloadApp from "../components/downloads/downloads.component";
import axios from "axios";
import { useIdleTimer } from "react-idle-timer";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const Home = () => {
	let [data, setData] = useState([]),
		[logUser, setLogUser] = useState(null);

	const getCoords = async () => {
		const pos = await new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		});

		return {
			long: pos.coords.longitude,
			lat: pos.coords.latitude,
		};
	};

	let getLocation = async () => {
		let info = await getCoords();
		console.log({ info });
		try {
			var resp = await axios.get(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${info?.lat},${info?.long}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
				{ baseURL: null }
			);

			console.log({ resp: resp?.data });
		} catch (error) {
			console.log({ error });
		}
		try {
			var destinationPlaceId = await axios.post(
				`/api/v1/user?place_id=${resp?.data?.results[0]?.place_id}`,
				{ data }
			);

			console.log({ resp: destinationPlaceId?.data });
			setLogUser(destinationPlaceId?.data);
		} catch (error) {
			console.log({ error });
		}
	};

	useEffect(() => {
		console.log({ time: getLastActiveTime() });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [stage, setStage] = useState(1);
	let [result, setResult] = useState(null);

	const { getLastActiveTime } = useIdleTimer({
		timeout: 1000 * 60 * 1,
		onIdle: ![1, 13, 14, 15]?.includes(stage) && !logUser ? getLocation : null,
		debounce: 500,
	});

	const goToNext = next => {
		setStage(next);
	};

	let handleNext = (datum, handleStage) => e => {
			e?.preventDefault();
			let findStage = data?.find(item => stage === item?.stage),
				newData = data;
			if (findStage) {
				newData = data?.map(item =>
					item?.stage === stage ? { stage, ...datum } : item
				);
			} else {
				newData = [...data, { stage, ...datum }];
			}
			setData(newData);
			handleStage();
		},
		[loading, setLoading] = useState(false),
		handleSubmit = (user, handleStage) => async e => {
			e?.preventDefault();
			if (!user) return;
			if (!user?.email || !user?.telephone || !user?.name)
				return toast.info("Please provide all necessary details");
			setLoading("loading");
			try {
				let info = await getCoords();
				console.log({ info });
				try {
					var resp = await axios.get(
						`https://maps.googleapis.com/maps/api/geocode/json?latlng=${info?.lat},${info?.long}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
						{ baseURL: null }
					);

					console.log({ resp: resp?.data });
				} catch (error) {
					console.log({ error });
				}
				try {
					var destinationPlaceId = await axios.post(`/api/v1/player`, {
						data,
						...user,
						place_id: resp?.data?.results?.[0]?.place_id,
					});
					setResult(destinationPlaceId?.data);
					console.log({ resp: destinationPlaceId?.data });
					setLogUser(null);
					handleStage();
				} catch (err) {
					setLoading(false);
					if (err) console.log(err.response?.data?.data, { err });
					if (err?.response?.status === 429) toast.error(err?.response?.data);
					let error = err.response?.data?.data;

					if (error) {
						error?.forEach(item => toast.error(item?.msg));
					}
				}
			} catch (error) {
				console.log({ error });
				setLoading(false);
			}
			setLoading(false);
		};

	return (
		<>
			<AnimatePresence mode="wait" initial={false}>
				{stage === 1 && (
					<StageOne handleStage={() => goToNext(2)} handleNext={handleNext} />
				)}
				{stage === 2 && (
					<StageTwo
						handleStage={() => goToNext(3)}
						goBack={() => goToNext(1)}
						handleNext={handleNext}
					/>
				)}
				{stage === 3 && (
					<StageTwoSub
						handleStage={() => goToNext(4)}
						handleNext={handleNext}
					/>
				)}
				{stage === 4 && (
					<StageThree
						handleStage={() => goToNext(5)}
						goBack={() => goToNext(2)}
						handleNext={handleNext}
					/>
				)}
				{stage === 5 && (
					<StageFour
						handleStage={() => goToNext(6)}
						goBack={() => goToNext(4)}
						handleNext={handleNext}
					/>
				)}
				{stage === 6 && (
					<StageFourSub
						handleStage={() => goToNext(7)}
						handleNext={handleNext}
					/>
				)}
				{stage === 7 && (
					<StageFive
						handleStage={() => goToNext(8)}
						goBack={() => goToNext(5)}
						handleNext={handleNext}
					/>
				)}
				{stage === 8 && (
					<StageFiveSub
						handleStage={() => goToNext(9)}
						handleNext={handleNext}
					/>
				)}
				{stage === 9 && (
					<StageSix
						handleStage={() => goToNext(10)}
						goBack={() => goToNext(7)}
						handleNext={handleNext}
					/>
				)}
				{stage === 10 && (
					<StageSeven
						handleStage={() => goToNext(11)}
						goBack={() => goToNext(9)}
						handleNext={handleNext}
					/>
				)}
				{stage === 11 && (
					<StageEight
						handleStage={() => goToNext(12)}
						goBack={() => goToNext(10)}
						handleNext={handleNext}
					/>
				)}
				{stage === 12 && (
					<StageNine
						handleStage={() => goToNext(13)}
						goBack={() => goToNext(11)}
						handleNext={handleNext}
					/>
				)}
				{stage === 13 && (
					<UserDetails
						handleStage={() => goToNext(14)}
						handleNext={handleNext}
						loading={loading}
						handleSubmit={handleSubmit}
					/>
				)}
				{stage === 14 && (
					<Calculating
						handleStage={() => goToNext(15)}
						handleNext={handleNext}
					/>
				)}
				{stage === 15 && (
					<Result
						handleStage={() => goToNext(1)}
						handleNext={handleNext}
						result={result}
					/>
				)}
			</AnimatePresence>
		</>
	);
};

export default Home;

const StageOne = ({ handleStage, handleNext }) => {
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
								onClick={handleNext({}, handleStage)}
								whileHover={{ color: "black", backgroundColor: "#FFBE48" }}
								transition={{ duration: 0.5 }}>
								Play now
							</motion.button>
						</div>
					</div>
					<DownloadApp />
				</div>
			</div>
		</Background>
	);
};

const StageTwo = ({ handleStage, goBack, handleNext }) => {
	return (
		<Background image={bg1}>
			<div className="relative h-full container mx-auto px-4">
				<div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
					<div className="flex items-center justify-between w-full">
						<Back goBack={goBack} />
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
									onClick={handleNext(
										{
											question: "Do you work in Lagos",
											answer: "Yes",
										},
										handleStage
									)}>
									Yes
								</button>
								<OptionButton
									width={"w-fit px-4"}
									color={"black"}
									colorOne={"white"}
									handleOption={handleNext(
										{
											question: "Do you work in Lagos",
											answer: "No, I used to work in Lagos",
										},
										handleStage
									)}
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
									handleOption={handleNext(
										{
											question: "Do you work in Lagos",
											answer: "No, I plan to work in Lagos",
										},
										handleStage
									)}
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
					<DownloadApp color={"white"} />
				</div>
			</div>
		</Background>
	);
};

const StageTwoSub = ({ handleStage, handleNext }) => {
	setTimeout(handleNext({}, handleStage), [4000]);
	const popUp = {
		hidden: {
			y: 100,
			//  opacity: 0
		},
		show: {
			y: 0,
			// opacity: 1,
			transition: { type: "spring", stiffness: 40, delay: 1.4 },
		},
		exit: {
			y: 100,
			// opacity: 1,
			transition: { type: "spring", stiffness: 40 },
		},
	};
	return (
		<Background image={bg1}>
			<div className="relative h-full container mx-auto px-4">
				<div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
					<div className="flex items-center justify-between w-full">
						<Back />
						{/* <div></div> */}
						<Sound />
					</div>
					<DownloadApp color={"white"} />
				</div>
				<AnimatePresence>
					<motion.img
						src={require("../assets/oshey.png")}
						alt=""
						className="h-40 fixed bottom-6 left-0"
						variants={popUp}
						initial="hidden"
						animate="show"
						exit="exit"
					/>
				</AnimatePresence>
			</div>
		</Background>
	);
};

const StageThree = ({ handleStage, goBack, handleNext }) => {
	const [option, setOption] = useState(false);

	let [value, setValue] = useState("");

	// const container = {
	// 	hidden: { opacity: 0 },
	// 	show: {
	// 		opacity: 1,
	// 		transition: { delay: 0.7, duration: 0.6 },
	// 	},
	// };

	const otherOptions = () => {
		if (option === false) {
			setOption(1);
			return;
		}
		// handleStage();
	};
	return (
		<Background image={bg2}>
			<div className="relative h-full container mx-auto px-4">
				{/* <div className="fixed inset-0 bg-white opacity-60"></div> */}
				<div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
					<div className="flex items-center justify-between w-full">
						<Back goBack={goBack} />
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
											handleOption={handleNext(
												{
													question: "How long have you worked in Lagos",
													answer: "1 Year",
												},
												handleStage
											)}
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
											handleOption={handleNext(
												{
													question: "How long have you worked in Lagos",
													answer: "2 Years",
												},
												handleStage
											)}
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
											handleOption={handleNext(
												{
													question: "How long have you worked in Lagos",
													answer: "3 Years",
												},
												handleStage
											)}
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
											handleOption={handleNext(
												{
													question: "How long have you worked in Lagos",
													answer: "4 Years",
												},
												handleStage
											)}
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
											bgStart={"white"}
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
												transition={{ duration: 0.9 }}>
												<div className="absolute inset-0 border-b skew-x-12 -rotate-6 mb-2"></div>
												<div className="absolute inset-0 border-b skew-x-12 mb-1"></div>
												<div className="absolute inset-0 border-b -skew-x-6 ml-2 mb-1 rotate-3"></div>
												<input
													type="tel"
													onChange={e => setValue(e.target.value)}
													value={value}
													className="bg-transparent w-10 border-none relative z-20 font-sans font-black outline-0 outline-transparent"
													placeholder="10"
												/>
												Years
												<OptionButton
													width={"w-fit px-4"}
													color={"white"}
													colorOne={"#14AE5C"}
													bgStart={"white"}
													handleOption={handleNext(
														{
															question: "How long have you worked in Lagos",
															answer: `${value} Years`,
														},
														handleStage
													)}
													children={
														<span className="flex flex-col items-center text-lg">
															<span>
																Next
																<span className="fs font-san font-black"></span>
															</span>
														</span>
													}
												/>
											</motion.div>
										)}
									</div>
								</div>
							}
						/>
					</div>
					<DownloadApp color={"white"} />
				</div>
			</div>
		</Background>
	);
};

const StageFour = ({ handleStage, goBack, handleNext }) => {
	return (
		<Background image={bg3}>
			<div className="relative h-full container mx-auto px-4">
				{/* <div className="fixed inset-0 bg-white opacity-60"></div> */}
				<div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
					<div className="flex items-center justify-between w-full">
						<Back goBack={goBack} />
						{/* <div></div> */}
						<Sound />
					</div>
					<DisplayBoard
						question={
							<p
								className="text-4xl text-center"
								style={{ fontFamily: "ageer" }}>
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
									handleOption={handleNext(
										{
											question: "Which part of Lagos do you live",
											answer: `Mainland`,
										},
										handleStage
									)}
									children={
										<span className="flex flex-col items-center">Mainland</span>
									}
								/>
								<OptionButton
									width={"w-fit px-4"}
									color={"black"}
									colorOne={"white"}
									handleOption={handleNext(
										{
											question: "Which part of Lagos do you live",
											answer: `Island`,
										},
										handleStage
									)}
									children={
										<span className="flex flex-col items-center">Island</span>
									}
								/>
							</div>
						}
					/>
					<DownloadApp color={"white"} />
				</div>
			</div>
		</Background>
	);
};

const StageFourSub = ({ handleStage, handleNext }) => {
	setTimeout(handleNext({}, handleStage), [4000]);
	const popUp = {
		hidden: { y: 100, opacity: 0 },
		show: {
			y: 0,
			opacity: 1,
			transition: { type: "spring", stiffness: 40, delay: 1.4 },
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
						<DownloadApp color={"white"} />
					</div>

					<motion.img
						src={require("../assets/hustle-up.png")}
						alt=""
						className="h-40 fixed bottom-6 left-0"
						variants={popUp}
						initial="hidden"
						animate="show"
					/>
				</div>
			</Background>
		</AnimatePresence>
	);
};

const StageFive = ({ handleStage, goBack, handleNext }) => {
	return (
		<Background image={bg3}>
			<div className="relative h-full container mx-auto px-4">
				{/* <div className="fixed inset-0 bg-white opacity-60"></div> */}
				<div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
					<div className="flex items-center justify-between w-full">
						<Back goBack={goBack} />
						{/* <div></div> */}
						<Sound />
					</div>
					<DisplayBoard
						question={
							<p
								className="text-4xl text-center"
								style={{ fontFamily: "ageer" }}>
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
									handleOption={handleNext(
										{
											question: "Which part of Lagos do your work place",
											answer: `Mainland`,
										},
										handleStage
									)}
									children={
										<span className="flex flex-col items-center">Mainland</span>
									}
								/>
								<OptionButton
									width={"w-fit px-4"}
									color={"black"}
									colorOne={"white"}
									handleOption={handleNext(
										{
											question: "Which part of Lagos do your work place",
											answer: `Island`,
										},
										handleStage
									)}
									children={
										<span className="flex flex-col items-center">Island</span>
									}
								/>
							</div>
						}
					/>
					<DownloadApp color={"white"} />
				</div>
			</div>
		</Background>
	);
};

const StageFiveSub = ({ handleStage, goBack, handleNext }) => {
	setTimeout(handleNext({}, handleStage), [4000]);

	const popUp = {
		hidden: { y: 100, opacity: 0 },
		show: {
			y: 0,
			opacity: 1,
			transition: { type: "spring", stiffness: 40, delay: 1.4 },
		},
	};
	return (
		<AnimatePresence>
			<Background image={bg3}>
				<div className="relative h-full container mx-auto px-4">
					<div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
						<div className="flex items-center justify-between w-full">
							<Back goBack={goBack} />
							{/* <div></div> */}
							<Sound />
						</div>
						<DownloadApp color={"white"} />
					</div>

					<motion.img
						src={require("../assets/hustle-pay.png")}
						alt=""
						className="h-40 fixed bottom-6 left-0"
						variants={popUp}
						initial="hidden"
						animate="show"
					/>
				</div>
			</Background>
		</AnimatePresence>
	);
};

const StageSix = ({ handleStage, goBack, handleNext }) => {
	const [option, setOption] = useState(false);
	let [value, setValue] = useState("");
	const otherOptions = () => {
		if (option === false) {
			setOption(1);
			return;
		}
		// handleStage();
	};
	return (
		<Background image={bg4}>
			<div className="relative h-full container mx-auto px-4">
				{/* <div className="fixed inset-0 bg-white opacity-60"></div> */}
				<div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
					<div className="flex items-center justify-between w-full">
						<Back goBack={goBack} />
						{/* <div></div> */}
						<Sound />
					</div>
					<DisplayBoard
						question={
							<p
								className="text-4xl text-center"
								style={{ fontFamily: "ageer" }}>
								What time do you resume <br /> work
								<span className="c font-sans font-black">?</span>
							</p>
						}
						options={
							<div>
								<div className="flex items-center justify-center flex-wrap gap-4">
									<OptionButton
										width={"w-fit px-4"}
										color={"black"}
										colorOne={"white"}
										handleOption={handleNext(
											{
												question: "What time do you resume work",
												answer: `07:00 AM`,
											},
											handleStage
										)}
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
										handleOption={handleNext(
											{
												question: "What time do you resume work",
												answer: `08:00 AM`,
											},
											handleStage
										)}
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
										handleOption={handleNext(
											{
												question: "What time do you resume work",
												answer: `09:00 AM`,
											},
											handleStage
										)}
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
										handleOption={handleNext(
											{
												question: "What time do you resume work",
												answer: `10:00 AM`,
											},
											handleStage
										)}
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
											transition={{ duration: 0.9 }}>
											<div className="relative">
												<div className="absolute inset-0 border-b skew-x-12 -rotate-6 mb-2 opacity-30"></div>
												<div className="absolute inset-0 border-b skew-x-12 mb-1 opacity-30"></div>
												<div className="absolute inset-0 border-b -skew-x-6 ml-2 mb-1 rotate-3 opacity-30"></div>
												<input
													type="time"
													className="bg-transparent w-12 border-none relative z-20 font-sans font-black outline-0 outline-transparent"
													placeholder="00"
													value={value}
													onChange={e => setValue(e.target.value)}
												/>
											</div>
											<span className="c font-sans font-extrabold">:</span>
											{/* <div className="relative">
												<div className="absolute inset-0 border-b skew-x-12 -rotate-6 mb-2 opacity-30"></div>
												<div className="absolute inset-0 border-b skew-x-12 mb-1 opacity-30"></div>
												<div className="absolute inset-0 border-b -skew-x-6 ml-2 mb-1 rotate-3 opacity-30"></div>
												<input
													type="text"
													className="bg-transparent w-12 border-none relative z-20 font-sans font-black outline-0 outline-transparent"
													placeholder="00"
												/>
											</div> */}
											{/* <select className="bg-transparent w-12 border-none relative z-20 outline-0 outline-transparent">
												<option value="am">AM</option>
												<option value="pm">PM</option>
											</select> */}
											<OptionButton
												width={"w-fit px-4"}
												color={"white"}
												colorOne={"#14AE5C"}
												bgStart={"white"}
												handleOption={handleNext(
													{
														question: "What time do you resume work",
														answer: value,
													},
													handleStage
												)}
												children={
													<span className="flex flex-col items-center text-lg">
														<span>
															Next
															<span className="fs font-san font-black"></span>
														</span>
													</span>
												}
											/>
										</motion.div>
									)}
								</div>
							</div>
						}
					/>
					<DownloadApp color={"white"} />
				</div>
			</div>
		</Background>
	);
};

const StageSeven = ({ handleStage, goBack, handleNext }) => {
	const [option, setOption] = useState(false);

	let [value, setValue] = useState("");
	const otherOptions = () => {
		if (option === false) {
			setOption(1);
			return;
		}
		// handleStage();
	};
	return (
		<Background image={bg4}>
			<div className="relative h-full container mx-auto px-4">
				{/* <div className="fixed inset-0 bg-white opacity-60"></div> */}
				<div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
					<div className="flex items-center justify-between w-full">
						<Back goBack={goBack} />
						{/* <div></div> */}
						<Sound />
					</div>
					<DisplayBoard
						question={
							<p
								className="text-4xl text-center"
								style={{ fontFamily: "ageer" }}>
								What time do you resume <br /> work
								<span className="c font-sans font-black">?</span>
							</p>
						}
						options={
							<div>
								<div className="flex items-center justify-center flex-wrap gap-4">
									<OptionButton
										width={"w-fit px-4"}
										color={"black"}
										colorOne={"white"}
										handleOption={handleNext(
											{
												question: "What time do you resume work",
												answer: `07:00 AM`,
											},
											handleStage
										)}
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
										handleOption={handleNext(
											{
												question: "What time do you resume work",
												answer: `08:00 AM`,
											},
											handleStage
										)}
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
										handleOption={handleNext(
											{
												question: "What time do you resume work",
												answer: `09:00 AM`,
											},
											handleStage
										)}
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
										handleOption={handleNext(
											{
												question: "What time do you resume work",
												answer: `10:00 AM`,
											},
											handleStage
										)}
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
											transition={{ duration: 0.9 }}>
											<div className="relative">
												<div className="absolute inset-0 border-b skew-x-12 -rotate-6 mb-2 opacity-30"></div>
												<div className="absolute inset-0 border-b skew-x-12 mb-1 opacity-30"></div>
												<div className="absolute inset-0 border-b -skew-x-6 ml-2 mb-1 rotate-3 opacity-30"></div>
												<input
													type="time"
													className="bg-transparent w-12 border-none relative z-20 font-sans font-black outline-0 outline-transparent"
													placeholder="00"
													value={value}
													onChange={e => setValue(e.target.value)}
												/>
											</div>
											<OptionButton
												width={"w-fit px-4"}
												color={"white"}
												colorOne={"#14AE5C"}
												bgStart={"white"}
												handleOption={handleNext(
													{
														question: "What time do you resume work",
														answer: value,
													},
													handleStage
												)}
												children={
													<span className="flex flex-col items-center text-lg">
														<span>
															Next
															<span className="fs font-san font-black"></span>
														</span>
													</span>
												}
											/>
										</motion.div>
									)}
								</div>
							</div>
						}
					/>
					<DownloadApp color={"white"} />
				</div>
			</div>
		</Background>
	);
};

const StageEight = ({ handleStage, goBack, handleNext }) => {
	const [option, setOption] = useState(false);
	let [value, setValue] = useState("");
	const otherOptions = () => {
		if (option === false) {
			setOption(1);
			return;
		}
		// handleStage();
	};
	return (
		<Background image={bg5}>
			<div className="relative h-full container mx-auto px-4">
				{/* <div className="fixed inset-0 bg-white opacity-60"></div> */}
				<div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
					<div className="flex items-center justify-between w-full">
						<Back goBack={goBack} />
						{/* <div></div> */}
						<Sound />
					</div>
					<DisplayBoard
						question={
							<p
								className="text-4xl text-center"
								style={{ fontFamily: "ageer" }}>
								What time do you close from
								<br />
								work
								<span className="c font-sans font-black">?</span>
							</p>
						}
						options={
							<div>
								<div className="flex items-center justify-center flex-wrap gap-4">
									<OptionButton
										width={"w-fit px-4"}
										color={"black"}
										colorOne={"white"}
										handleOption={handleNext(
											{
												question: "What time do you close from work",
												answer: `03:00 PM`,
											},
											handleStage
										)}
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
										handleOption={handleNext(
											{
												question: "What time do you close from work",
												answer: `04:00 PM`,
											},
											handleStage
										)}
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
										handleOption={handleNext(
											{
												question: "What time do you close from work",
												answer: `05:00 PM`,
											},
											handleStage
										)}
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
										handleOption={handleNext(
											{
												question: "What time do you close from work",
												answer: `06:00 PM`,
											},
											handleStage
										)}
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
											transition={{ duration: 0.9 }}>
											<div className="relative">
												<div className="absolute inset-0 border-b skew-x-12 -rotate-6 mb-2 opacity-30"></div>
												<div className="absolute inset-0 border-b skew-x-12 mb-1 opacity-30"></div>
												<div className="absolute inset-0 border-b -skew-x-6 ml-2 mb-1 rotate-3 opacity-30"></div>
												<input
													type="time"
													className="bg-transparent w-12 border-none relative z-20 font-sans font-black outline-0 outline-transparent"
													placeholder="00"
													value={value}
													onChange={e => setValue(e.target.value)}
												/>
											</div>
											<OptionButton
												width={"w-fit px-4"}
												color={"white"}
												colorOne={"#14AE5C"}
												bgStart={"white"}
												handleOption={handleNext(
													{
														question: "What time do you resume work",
														answer: value,
													},
													handleStage
												)}
												children={
													<span className="flex flex-col items-center text-lg">
														<span>
															Next
															<span className="fs font-san font-black"></span>
														</span>
													</span>
												}
											/>
										</motion.div>
									)}
								</div>
							</div>
						}
					/>
					<DownloadApp color={"white"} />
				</div>
			</div>
		</Background>
	);
};

const StageNine = ({ handleStage, goBack, handleNext }) => {
	const [option, setOption] = useState(false);

	let [value, setValue] = useState("");
	const otherOptions = () => {
		if (option === false) {
			setOption(1);
			return;
		}
		// handleStage();
	};
	return (
		<Background image={bg5}>
			<div className="relative h-full container mx-auto px-4">
				{/* <div className="fixed inset-0 bg-white opacity-60"></div> */}
				<div className="relative z-20 h-full flex flex-col items-center justify-between py-10 w-full">
					<div className="flex items-center justify-between w-full">
						<Back goBack={goBack} />
						{/* <div></div> */}
						<Sound />
					</div>
					<DisplayBoard
						question={
							<p
								className="text-4xl text-center"
								style={{ fontFamily: "ageer" }}>
								What time do you get home
								<span className="c font-sans font-black">?</span>
							</p>
						}
						options={
							<div>
								<div className="flex items-center justify-center flex-wrap gap-4">
									<OptionButton
										width={"w-fit px-4"}
										color={"black"}
										colorOne={"white"}
										handleOption={handleNext(
											{
												question: "What time do you close from work",
												answer: `03:00 PM`,
											},
											handleStage
										)}
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
										handleOption={handleNext(
											{
												question: "What time do you close from work",
												answer: `04:00 PM`,
											},
											handleStage
										)}
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
										handleOption={handleNext(
											{
												question: "What time do you close from work",
												answer: `05:00 PM`,
											},
											handleStage
										)}
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
										handleOption={handleNext(
											{
												question: "What time do you close from work",
												answer: `06:00 PM`,
											},
											handleStage
										)}
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
											transition={{ duration: 0.9 }}>
											<div className="relative">
												<div className="absolute inset-0 border-b skew-x-12 -rotate-6 mb-2 opacity-30"></div>
												<div className="absolute inset-0 border-b skew-x-12 mb-1 opacity-30"></div>
												<div className="absolute inset-0 border-b -skew-x-6 ml-2 mb-1 rotate-3 opacity-30"></div>
												<input
													type="time"
													className="bg-transparent w-12 border-none relative z-20 font-sans font-black outline-0 outline-transparent"
													placeholder="00"
													value={value}
													onChange={e => setValue(e.target.value)}
												/>
											</div>
											<OptionButton
												width={"w-fit px-4"}
												color={"white"}
												colorOne={"#14AE5C"}
												bgStart={"white"}
												handleOption={handleNext(
													{
														question: "What time do you resume work",
														answer: value,
													},
													handleStage
												)}
												children={
													<span className="flex flex-col items-center text-lg">
														<span>
															Next
															<span className="fs font-san font-black"></span>
														</span>
													</span>
												}
											/>
										</motion.div>
									)}
								</div>
							</div>
						}
					/>
					<DownloadApp color={"white"} />
				</div>
			</div>
		</Background>
	);
};

const UserDetails = ({ handleStage, handleNext, handleSubmit, loading }) => {
	let init = {
			name: "",
			telephone: "",
			email: "",
		},
		[user, setUser] = useState(init);
	console.log({ loading });
	return (
		<Background image={bg5}>
			<div className="relative h-full container mx-auto px-4">
				<div className="fixed inset-0"></div>
				<div className="relative z-20 h-full flex flex-col items-center justify-between py-10">
					<div className="flex items-center justify-end w-full">
						<Sound />
					</div>
					<div className="w-full">
						<div className="text-center mb-4" style={{ fontFamily: "ageer" }}>
							<p>Fill in your details to view your traffic age</p>
						</div>
						<div className="flex flex-col justify-center items-center">
							<motion.div
								className="flex items-center gap-2 text-white text-md relative"
								style={{ fontFamily: "ageer" }}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.9 }}>
								<div className="relative">
									<div className="absolute inset-0 border-b skew-x-12 -rotate-6 mb-1 opacity-80"></div>
									<div className="absolute inset-0 border-b skew-x-12 mb-1 opacity-80"></div>
									<div className="absolute inset-0 border-b -skew-x-6 ml-2 mb-1 rotate-3 opacity-80"></div>
									<input
										type="text"
										className="bg-transparent w-full border-none relative z-20 font-sans text-black outline-0 outline-transparent text-center"
										placeholder="James Akugbe"
										value={user?.name}
										onChange={e => setUser({ ...user, name: e.target.value })}
									/>
								</div>
							</motion.div>
							<motion.div
								className="flex items-center gap-2 text-white text-md relative"
								style={{ fontFamily: "ageer" }}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.9 }}>
								<div className="relative">
									<div className="absolute inset-0 border-b skew-x-12 -rotate-6 mb-1 opacity-80"></div>
									<div className="absolute inset-0 border-b skew-x-12 mb-1 opacity-80"></div>
									<div className="absolute inset-0 border-b -skew-x-6 ml-2 mb-1 rotate-3 opacity-80"></div>
									<input
										type="tel"
										className="bg-transparent w-full border-none relative z-20 font-sans outline-0 outline-transparent text-black text-center"
										placeholder="0800 000 0000"
										value={user?.telephone}
										maxLength={11}
										onChange={e =>
											setUser({ ...user, telephone: e.target.value })
										}
									/>
								</div>
							</motion.div>
							<motion.div
								className="flex items-center gap-2 text-white text-md relative"
								style={{ fontFamily: "ageer" }}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.9 }}>
								<div className="relative">
									<div className="absolute inset-0 border-b skew-x-12 -rotate-6 mb-1 opacity-80"></div>
									<div className="absolute inset-0 border-b skew-x-12 mb-1 opacity-80"></div>
									<div className="absolute inset-0 border-b -skew-x-6 ml-2 mb-1 rotate-3 opacity-80"></div>
									<input
										type="email"
										className="bg-transparent w-full border-none relative z-20 font-sans outline-0 outline-transparent text-black text-center"
										placeholder="example@xyz.com"
										value={user?.email}
										onChange={e => setUser({ ...user, email: e.target.value })}
									/>
								</div>
							</motion.div>
						</div>
						<div className="flex justify-center items-center gap-8 mt-5">
							<motion.button
								className="bg-mainDark py-2 text-white px-8 whitespace-nowrap md:text-2xl"
								style={{ fontFamily: "ageer" }}
								onClick={loading ? null : handleSubmit(user, handleStage)}
								whileHover={{ color: "black", backgroundColor: "#FFBE48" }}
								transition={{ duration: 0.5 }}>
								{loading ? (
									<>
										{" "}
										<ClipLoader size={20} color="white" />{" "}
									</>
								) : null}{" "}
								Next
							</motion.button>
							<motion.button
								className="bg-white py-2 text-mainDark px-8 md:text-2xl border border-mainDark"
								style={{ fontFamily: "ageer" }}
								onClick={() => setUser(init)}
								whileHover={{ color: "black", backgroundColor: "#FFBE48" }}
								transition={{ duration: 0.5 }}>
								Reset
							</motion.button>
						</div>
					</div>
					<DownloadApp color={"white"} />
				</div>
			</div>
		</Background>
	);
};

const Calculating = ({ handleStage, handleNext }) => {
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
								style={{ fontFamily: "ageer" }}>
								Calculating
							</p>
						}
						options={
							<div className="flex items-center justify-center">
								<motion.img
									src={require("../assets/tire.png")}
									alt=""
									className="h-20"
									animate={{
										// rotate: [0, 20, 45, 65, 90, 110, 135, 150, 180, 200, 225, 245, 260, 295, 315, 330, 360, 0],
										rotate: [0, 45, 90, 135, 180, 225, 270, 315],
										transition: {
											duration: 2,
											// ease: "easeInOut",
											repeat: Infinity,
										},
									}}
								/>
							</div>
						}
					/>
					<DownloadApp color={"white"} />
				</div>
			</div>
		</Background>
	);
};

const Result = ({ handleStage, handleNext, result }) => {
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
								<span className="font-sans font-black">
									{result?.data?.trafficAge || 3}
								</span>{" "}
								years
							</div>
						</div>
						<div className="flex justify-center items-center gap-8">
							<motion.button
								className="bg-mainDark py-2 text-white px-8 whitespace-nowrap md:text-2xl"
								style={{ fontFamily: "ageer" }}
								onClick={handleStage}
								whileHover={{ color: "black", backgroundColor: "#FFBE48" }}
								transition={{ duration: 0.5 }}>
								Play again
							</motion.button>
							<motion.button
								className="bg-white py-2 text-mainDark px-8 md:text-2xl border border-mainDark"
								style={{ fontFamily: "ageer" }}
								onClick={handleStage}
								whileHover={{ color: "black", backgroundColor: "#FFBE48" }}
								transition={{ duration: 0.5 }}>
								Share
							</motion.button>
						</div>
					</div>
					<DownloadApp color={"white"} />
				</div>
			</div>
		</Background>
	);
};
