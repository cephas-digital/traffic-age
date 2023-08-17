const LocationMetric = ({ bgColor, location, percent }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div
          className={`h-4 w-4 rounded-md`}
          style={{ background: bgColor }}
        ></div>
        <p className="text-sm font-medium text-[#0D062D99]">{location}</p>
      </div>
      <p className="text-sm font-medium text-[#0D062D99]">{percent}</p>
    </div>
  );
};

export default LocationMetric;
