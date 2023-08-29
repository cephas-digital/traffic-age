import DashboardCard from "../../components/dashboardCard/dashboardCard";

// import { FaUserAlt } from "react-icons/fa";
import LocationMetric from "../../components/locationMetric/locationMetric";
import TrafficAge, { ToolTip } from "../../components/traffic-age/traffic-age";
import { useState } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
	const [toolTip, setToolTip] = useState(false);
	const [target, setTarget] = useState(null);
	const [name, setName] = useState(null);
	const [level, setLevel] = useState(null);

	const handleMouseOver = e => {
		console.log("i am here");
		setTarget(e);
		console.log(e);
		setToolTip(true);
	};

	const handleMouseLeave = e => {
		setTarget(null);
		setName(null);
		setLevel(null);
		setToolTip(false);
	};

	let { player, user } = useSelector(state => state),
		colorArr = [
			"#4A27AC",
			"#EB5A93",
			"#FEB934",
			"#32AC27",
			"#32FAE2",
			"#FF00E5",
			"#000000",
			"#BBA3FF",
			"#FEB934",
		];

	return (
		<div className="block mt-24 p-6 bg-white border border-gray-200 rounded-lg shadow mx-8">
			<div className="fixed inset-0 bg-gray-50 -z-50"></div>
			<div className="py-2 border-b border-gray-50">
				<p className="mb-2 text-sm font-bold tracking-tight text-gray-900">
					Here’s an overview of all your stats
				</p>
			</div>
			<div className="grid = md:grid-cols-3 gap-4 mt-8">
				<div className="space-y-4">
					<DashboardCard
						bgStyle={"bg-[#3570FF]"}
						icon={
							<img
								src={require("../../assets/card-ico-1.png")}
								className="h-16"
								alt="Data"
							/>
						}
						title={"Total User"}
						titleColor={"text-white opacity-80"}
						amount={user?.paginate?.total || 0}
						amountColor={"text-white"}
					/>
					<DashboardCard
						bgStyle={"border border-gray-300"}
						icon={
							<img
								src={require("../../assets/card-ico-2.png")}
								className="h-16"
								alt="Data"
							/>
						}
						title={"Total Players"}
						titleColor={"text-[#0D062D] opacity-80"}
						amount={player?.paginate?.total || 0}
						amountColor={"text-[#0D062D]"}
					/>
				</div>
				<div className={`rounded-2xl p-8 border border-gray-300`}>
					<div className="flex justify-between items-center">
						<p className="font-bold text-[#0D062D]text-sm">
							Users vs Traffic age
						</p>
						<span>search</span>
					</div>
					<div className="flex flex-col justify-between gap-8">
						<div className="mt-4 space-y-4">
							<TrafficAge
								name={"Ola-Akande Ayokunle"}
								levelOne={108}
								levelTwo={150}
								levelThree={180}
								width={200}
								onMouseEnter={e => {
									setLevel();
									setName("Ola-Akande Ayokunle");
									console.log(e);
									e.target.id === "one"
										? setLevel(108)
										: e.target.id === "two"
										? setLevel(150)
										: e.target.id === "three" && setLevel(180);
									handleMouseOver(e);
								}}
								onMouseLeave={handleMouseLeave}
							/>
							<TrafficAge
								name={"Ola-Akande Ayokunle"}
								levelOne={108}
								levelTwo={150}
								levelThree={180}
								width={180}
								onMouseEnter={e => {
									setLevel();
									setName("Ola-Akande Ayokunle");
									console.log(e);
									e.target.id === "one"
										? setLevel(108)
										: e.target.id === "two"
										? setLevel(150)
										: e.target.id === "three" && setLevel(180);
									handleMouseOver(e);
								}}
								onMouseLeave={handleMouseLeave}
							/>
							<TrafficAge
								name={"Ola-Akande Ayokunle"}
								levelOne={108}
								levelTwo={150}
								levelThree={180}
								width={160}
								onMouseEnter={e => {
									setLevel();
									setName("Ola-Akande Ayokunle");
									console.log(e);
									e.target.id === "one"
										? setLevel(108)
										: e.target.id === "two"
										? setLevel(150)
										: e.target.id === "three" && setLevel(180);
									handleMouseOver(e);
								}}
								onMouseLeave={handleMouseLeave}
							/>
							<TrafficAge
								name={"Ola-Akande Ayokunle"}
								levelOne={108}
								levelTwo={150}
								levelThree={180}
								width={150}
								onMouseEnter={e => {
									setLevel();
									setName("Ola-Akande Ayokunle");
									console.log(e);
									e.target.id === "one"
										? setLevel(108)
										: e.target.id === "two"
										? setLevel(150)
										: e.target.id === "three" && setLevel(180);
									handleMouseOver(e);
								}}
								onMouseLeave={handleMouseLeave}
							/>
							<TrafficAge
								name={"Ola-Akande Ayokunle"}
								levelOne={108}
								levelTwo={150}
								levelThree={180}
								width={120}
								onMouseEnter={e => {
									setLevel();
									setName("Ola-Akande Ayokunle");
									console.log(e);
									e.target.id === "one"
										? setLevel(108)
										: e.target.id === "two"
										? setLevel(150)
										: e.target.id === "three" && setLevel(180);
									handleMouseOver(e);
								}}
								onMouseLeave={handleMouseLeave}
							/>
							<TrafficAge
								name={"Ola-Akande Ayokunle"}
								levelOne={108}
								levelTwo={150}
								levelThree={180}
								width={110}
								onMouseEnter={e => {
									setLevel();
									setName("Ola-Akande Ayokunle");
									console.log(e);
									e.target.id === "one"
										? setLevel(108)
										: e.target.id === "two"
										? setLevel(150)
										: e.target.id === "three" && setLevel(180);
									handleMouseOver(e);
								}}
								onMouseLeave={handleMouseLeave}
							/>
							<TrafficAge
								name={"Ola-Akande Ayokunle"}
								levelOne={108}
								levelTwo={150}
								levelThree={180}
								width={70}
								onMouseEnter={e => {
									setLevel();
									setName("Ola-Akande Ayokunle");
									console.log(e);
									e.target.id === "one"
										? setLevel(108)
										: e.target.id === "two"
										? setLevel(150)
										: e.target.id === "three" && setLevel(180);
									handleMouseOver(e);
								}}
								onMouseLeave={handleMouseLeave}
							/>
						</div>
						<div className="text-sm text-[#0D062D99] flex items-center justify-between">
							<span>0</span>
							<span>40</span>
							<span>80</span>
							<span>120</span>
							<span>160</span>
							<span>200</span>
						</div>
					</div>
				</div>
				<div className={`rounded-2xl p-8 border border-gray-300`}>
					<div className="flex justify-between items-center">
						<p className="font-bold text-[#0D062D]text-sm">
							Top User Locations
						</p>
					</div>
					<div className="mt-4 space-y-4">
						{user?.stat?.map((item, i) => (
							<LocationMetric
								bgColor={colorArr?.[i % colorArr?.length]}
								location={item?._id}
								percent={item?.percentage}
								key={i}
							/>
						))}
						{/* <LocationMetric
							bgColor={"#EB5A93"}
							location={"Ikeja"}
							percent={"32%"}
						/>
						<LocationMetric
							bgColor={"#FEB934"}
							location={"Ojota"}
							percent={"15.5%"}
						/>
						<LocationMetric
							bgColor={"#32AC27"}
							location={"Victoria Island"}
							percent={"15.5%"}
						/>
						<LocationMetric
							bgColor={"#32FAE2"}
							location={"Yaba"}
							percent={"15.5%"}
						/>
						<LocationMetric
							bgColor={"#FF00E5"}
							location={"Lekki"}
							percent={"15.5%"}
						/>
						<LocationMetric
							bgColor={"#000000"}
							location={"Bariga"}
							percent={"15.5%"}
						/>
						<LocationMetric
							bgColor={"#BBA3FF"}
							location={"lagos Island"}
							percent={"15.5%"}
						/>
						<LocationMetric
							bgColor={"#FEB934"}
							location={"Ojota"}
							percent={"15.5%"}
						/> */}
						<ToolTip evt={target} show={toolTip} level={level} name={name} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
