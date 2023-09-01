// import { useRef, useState } from "react";
import { HiMiniUser } from "react-icons/hi2";

const TrafficAge = ({
	name,
	levelOne,
	levelTwo,
	levelThree,
	width,
	...restProps
}) => {
	const total = Number(levelOne) + Number(levelTwo) + Number(levelThree);
	const percent = level => {
		return (level * 100) / width;
	};

	return (
		<div className="flex items-center gap-2">
			<p className="text-sm text-[#0D062D99] w-1/5 whitespace-nowrap overflow-x-hidden capitalize">
				{name}
			</p>
			<div
				className="flex items-center h-4 cursor-pointer"
				style={{ width: percent(width, 200).toString() + "%" }}>
				<div
					className={`h-full bg-[#5A3FFF]`}
					style={{ width: percent(levelOne, total).toString() + "%" }}
					id={"one"}
					{...restProps}></div>
				<div
					className={`h-full bg-[#268AFF]`}
					style={{ width: percent(levelTwo, total).toString() + "%" }}
					id={"two"}
					{...restProps}></div>
				<div
					className={`h-full bg-[#1ED6FF]`}
					style={{ width: percent(levelThree, total).toString() + "%" }}
					id={"three"}
					{...restProps}></div>
			</div>
		</div>
	);
};
export default TrafficAge;

export const ToolTip = ({ name = "Ayokunle", level = 150, show, evt }) => {
	const getMouseLocation = () => {
		let x = evt?.clientX;
		let y = evt?.clientY;
		return { x, y };
	};

	return (
		<div
			className={`${show ? "opacity-100" : "opacity-0"} 
      fixed transition-opacity duration-75 flex gap-x-2 bg-white rounded-lg shadow p-2 items-center`}
			style={{
				left: getMouseLocation().x,
				top: getMouseLocation().y,
				zIndex: 100,
			}}>
			<div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#3570FF] text-white">
				<HiMiniUser size={20} />
			</div>
			<div className="text-[#32325D]">
				<p className="text-sm font-extralight">{name}</p>
				<p className="font-bold">{level}</p>
			</div>
		</div>
	);
};
