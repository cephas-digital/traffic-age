import { ClipLoader } from "react-spinners";

const BUTTON_TYPES = {
	primary: "bg-[#14AE5C] text-white",
	primaryOutline: "border-2 border-[#14AE5C] text-main",
	secondary: "bg-[#F72585] text-white",
	tetiary: "border-2 border-main text-main",
};

const Button = ({
	children,
	loading,
	buttonType,
	width,
	style,
	title,
	loadCss,
	disabled,
	icon,
	type,
	...restProps
}) => {
	return (
		<div>
			<button
				type={type || "button"}
				disabled={loading || disabled}
				className={`text-sm p-2 px-8 rounded-lg flex items-center gap-2 ${
					width || "w-52"
				} ${style || ""} ${BUTTON_TYPES[buttonType]}`}
				{...restProps}>
				{icon && <span>{icon}</span>}
				{children}
				<span className={loading ? "me-2" : ""}>
					{title ? title : "log in"}
				</span>
				{loading && (
					<ClipLoader color={loadCss ? loadCss : "white"} size={16} />
				)}
			</button>
		</div>
	);
};

export default Button;
