import { useEffect, useState } from "react";
import {
	LoadMore,
	MainPaginate,
	MainRanger,
} from "../../components/pagination/pagination";
import { managePlayer } from "../../data/Reducers/PlayerReducer";
import { useDispatch, useSelector } from "react-redux";

const Players = () => {
	let dispatch = useDispatch(),
		{ player } = useSelector(state => state),
		[loading, setLoading] = useState("");

	useEffect(() => {
		dispatch(managePlayer("get"));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let [data, setData] = useState(null),
		[page, setPage] = useState(1);

	useEffect(() => {
		setData(player?.data);
	}, [player?.data]);

	let [range, setRange] = useState(10);

	const [itemOffset, setItemOffset] = useState(0);
	const endOffset = itemOffset + range;

	if (!data) return;

	const currentItems = data?.slice(itemOffset, endOffset);
	const pageCount = Math.ceil(data?.length / range);

	const handlePageClick = event => {
			const newOffset = (event.selected * range) % data?.length;
			setItemOffset(newOffset);
			setPage(1 + event?.selected);
		},
		handleLoadMore = async () => {
			setLoading("loadmore");
			await dispatch(
				managePlayer("get", {
					limit: player?.paginate?.limit * player?.paginate?.nextPage,
				})
			);
			setLoading(false);
		};

	return (
		<div className="block mt-24 p-6 bg-white border border-gray-200 rounded-lg shadow mx-8">
			<div className="fixed inset-0 bg-gray-50 -z-50"></div>
			<div className="py-2 border-b border-gray-50">
				<p className="mb-2 text-sm font-bold tracking-tight text-gray-900">
					Here’s an overview of all Players
				</p>
			</div>
			<div class="relative overflow-x-auto">
				<MainRanger range={range} setRange={setRange} />

				<table class="text-left w-full mt-4 text-[#0D062DCC] text-sm">
					<thead className="mb-2">
						<tr className="uppercase font-medium">
							<th
								scope="col"
								className="font-medium px-3 py-3 whitespace-nowrap">
								player Id
							</th>
							<th
								scope="col"
								className="font-medium px-3 py-3 whitespace-nowrap">
								Name
							</th>
							<th
								scope="col"
								className="font-medium px-3 py-3 whitespace-nowrap">
								Phone Number
							</th>
							<th
								scope="col"
								className="font-medium px-3 py-3 whitespace-nowrap">
								Traffic Age
							</th>
							<th
								scope="col"
								className="font-medium px-3 py-3 whitespace-nowrap">
								Number of shares
							</th>
							<th
								scope="col"
								className="font-medium px-3 py-3 whitespace-nowrap">
								Lagos Rider User
							</th>
							<th
								scope="col"
								className="font-medium px-3 py-3 whitespace-nowrap">
								Carbon credit earned
							</th>
						</tr>
					</thead>
					<tbody className="mt-4">
						{currentItems?.map((item, i) => (
							<tr className="mb-2" key={i}>
								<td className="font-medium px-3 py-3 whitespace-nowrap">
									{item?.item_id}
								</td>
								<td className="font-medium text-justify px-3 py-3 whitespace-nowrap">
									{item?.name}
								</td>
								<td className="font-medium text-justify px-3 py-3 whitespace-nowrap">
									{item?.telephone}
								</td>
								<td className="font-medium text-justify px-3 py-3 whitespace-nowrap">
<<<<<<< HEAD
									{/* {item?.trafficAgeLabel?.includes(" ")
										? item?.trafficAgeLabel
										: item?.trafficAge} */}
										{
											item?.trafficAge
										}
=======
									{item?.trafficAgeLabel?.includes(" ")
										? item?.trafficAgeLabel
										: item?.trafficAge}
>>>>>>> 3ab49fa1d9fea1b44ffd349d49775ef28cc2cef3
								</td>
								<td className="font-medium text-justify px-3 py-3 whitespace-nowrap">
									{item?.numberOfShares}
								</td>
								<td className="font-medium text-justify px-3 py-3 whitespace-nowrap">
									{item?.lagosRideUser ? "YES" : "NO"}
								</td>
								<td className="font-medium text-justify px-3 py-3 whitespace-nowrap">
									{item?.carbonCredit}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="mt-4 flex justify-end overflow-auto scrollbar-hide">
				<div className="mt-4 flex justify-center">
					<LoadMore
						next={page === pageCount && data?.hasNextPage}
						loading={loading === "loadmore"}
						handleLoadMore={handleLoadMore}
					/>
				</div>
				<div className="mt-4 flex justify-center">
					{/* <Pagination /> */}
					<MainPaginate
						pageCount={pageCount}
						handlePageClick={handlePageClick}
					/>
				</div>
			</div>
		</div>
	);
};

export default Players;
