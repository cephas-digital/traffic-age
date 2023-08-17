import Pagination from "../../components/pagination/pagination";

const Users = () => {
  return (
    <div className="block mt-24 p-6 bg-white border border-gray-200 rounded-lg shadow mx-8">
      <div className="fixed inset-0 bg-gray-50 -z-50"></div>
      <div className="py-2 border-b border-gray-50">
        <p className="mb-2 text-sm font-bold tracking-tight text-gray-900">
          Here’s an overview of all your users
        </p>
      </div>
      <div class="relative overflow-x-auto">
        <table class="text-left w-full mt-4 text-[#0D062DCC]">
          <thead className="mb-2">
            <tr className="uppercase font-medium">
              <th scope="col" className="font-medium px-3 py-3">
                user Id
              </th>
              <th scope="col" className="font-medium px-3 py-3">
                Location
              </th>
              <th scope="col" className="font-medium text-right px-3 py-3">
                Device IMEI
              </th>
            </tr>
          </thead>
          <tbody className="mt-4">
            <tr className="mb-2">
              <td className="font-medium px-3 py-3 whitespace-nowrap">XX838348HH40</td>
              <td className="font-medium text-justify px-3 py-3 whitespace-nowrap">Lekki</td>
              <td className="font-medium text-right px-3 py-3 whitespace-nowrap">XX838348HH40</td>
            </tr>
            <tr className="mb-2">
              <td className="font-medium px-3 py-3 whitespace-nowrap">XX838348HH40</td>
              <td className="font-medium text-justify px-3 py-3 whitespace-nowrap">Lekki</td>
              <td className="font-medium text-right px-3 py-3 whitespace-nowrap">XX838348HH40</td>
            </tr>
            <tr className="mb-2">
              <td className="font-medium px-3 py-3 whitespace-nowrap">XX838348HH40</td>
              <td className="font-medium text-justify px-3 py-3 whitespace-nowrap">Lekki</td>
              <td className="font-medium text-right px-3 py-3 whitespace-nowrap">XX838348HH40</td>
            </tr>
            <tr className="mb-2">
              <td className="font-medium px-3 py-3 whitespace-nowrap">XX838348HH40</td>
              <td className="font-medium text-justify px-3 py-3 whitespace-nowrap">Lekki</td>
              <td className="font-medium text-right px-3 py-3 whitespace-nowrap">XX838348HH40</td>
            </tr>
            <tr className="mb-2">
              <td className="font-medium px-3 py-3 whitespace-nowrap">XX838348HH40</td>
              <td className="font-medium text-justify px-3 py-3 whitespace-nowrap">Lekki</td>
              <td className="font-medium text-right px-3 py-3 whitespace-nowrap">XX838348HH40</td>
            </tr>
            <tr className="mb-2">
              <td className="font-medium px-3 py-3 whitespace-nowrap">XX838348HH40</td>
              <td className="font-medium text-justify px-3 py-3 whitespace-nowrap">Lekki</td>
              <td className="font-medium text-right px-3 py-3 whitespace-nowrap">XX838348HH40</td>
            </tr>
            <tr className="mb-2">
              <td className="font-medium px-3 py-3 whitespace-nowrap">XX838348HH40</td>
              <td className="font-medium text-justify px-3 py-3 whitespace-nowrap">Lekki</td>
              <td className="font-medium text-right px-3 py-3 whitespace-nowrap">XX838348HH40</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end overflow-auto scrollbar-hide">
        <Pagination />
      </div>
    </div>
  );
};

export default Users;
