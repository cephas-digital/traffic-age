const DashboardCard = ({
  bgStyle,
  icon,
  title,
  titleColor,
  amount,
  amountColor,
}) => {
  return (
    <div className={`rounded-2xl p-6 ${bgStyle}`}>
      {icon}
      <p className={`${titleColor} text-2xl mt-4 font-normal`}>{title}</p>
      <p className={`${amountColor} text-5xl mt-4 font-bold`}>{amount}</p>
    </div>
  );
};

export default DashboardCard;
