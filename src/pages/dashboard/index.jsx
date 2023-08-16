const Dashboard = () => {
  console.log("dashboard");
  return (
    <div className="block mt-24 p-6 bg-white border border-gray-200 rounded-lg shadow mx-8">
      <div className="fixed inset-0 bg-gray-50 -z-50"></div>
      <div className="py-2 border-b border-gray-50">
        <p className="mb-2 text-xl font-bold tracking-tight text-gray-900">
          Here’s an overview of all your stats
        </p>
      </div>
      <p className="font-normal text-gray-700">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
    </div>
  );
};

export default Dashboard;
