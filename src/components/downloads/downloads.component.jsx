const DownloadApp = ({ color }) => {
  return (
    <div className="w-fit md:ml-auto">
      <p className="text-sm shadow-lg mb-2" style={{ fontFamily: "ageer", color: color }}>
        Download the LagosRide App
      </p>
      <div className="flex items-center gap-2">
        <img
          src={require("../../assets/playstore.png")}
          alt=""
          className="h-8"
        />
        <img
          src={require("../../assets/appstore.png")}
          alt=""
          className="h-8"
        />
      </div>
    </div>
  );
};

export default DownloadApp;
