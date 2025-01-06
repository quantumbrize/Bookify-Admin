import React, { useMemo, useState,useEffect } from 'react'
import './Queries.css'
import ReactTable from '../../components/ReactTable/ReactTable.jsx';
import SectionMenuLeft from '../../components/SectionMenuLeft/SectionMenuLeft';
import { AdminSidebarContext } from '../../../context/adminSidebarContext';
import { useContext } from 'react';
import { config } from '../../../config.js';

const Queries = () => {

	const { isSidebar } = useContext(AdminSidebarContext);
	const [queries, setQueries] = useState([])

	const fetchQueries = async () => {
		try {
			const response = await fetch(`${config.backEndBaseUrl}api/user/queries`, {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'GET',
			});
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const result = await response.json();
			setQueries(result.data);
		} catch (error) {
			console.error('Fetching orders failed', error);
		}
	};

	useEffect(() => {
		fetchQueries();
	}, []);

	const columns = useMemo(
		() => [
			{
				accessorKey: 'name',
				header: 'User',
			},
			{
				accessorKey: 'phone',
				header: 'Phone',
			},
			{
				accessorKey: 'message',
				header: 'Message',
			},
			{
				accessorKey: 'created_at',
				header: 'Created On',
			},

		],
		[]
	);

	return (


		<>
			<div className="body">

				{/* #wrapper */}
				<div id="wrapper">
					{/* #page */}
					<div id="page" className="">
						{/* layout-wrap */}
						<div className="layout-wrap">
							<SectionMenuLeft />

							<div className="section-content-right">
								{/* main-content */}
								<div className="main-content" style={{ paddingLeft: isSidebar ? '280px' : '0px' }}>
									{/* main-content-wrap */}
									<div className="main-content-inner">
										<div className="flex items-center flex-wrap justify-between gap20 mb-27">
											<h3>Queries</h3>
										</div>
										<ReactTable columns={columns} data={queries} />
										{/* /main-content-wrap */}
									</div>
									{/* /main-content-wrap */}

								</div>
								{/* /main-content */}
							</div>
							{/* /section-content-right */}
						</div>
						{/* /layout-wrap */}
					</div>
					{/* /#page */}
				</div>
				{/* /#wrapper */}


			</div>
		</>
	)
}
export default Queries