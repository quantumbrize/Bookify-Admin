import React, { useMemo, useState, useEffect, useContext } from 'react';
import ReactTable from '../../components/ReactTable/ReactTable.jsx';
import SectionMenuLeft from '../../components/SectionMenuLeft/SectionMenuLeft.jsx';
import { AdminSidebarContext } from '../../../context/adminSidebarContext.js';
import { Link } from 'react-router-dom';
import { config } from '../../../config.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Vendors.css';
import './ToggleButton.css';

const Vendors = () => {
	const { isSidebar } = useContext(AdminSidebarContext);
	const [vendors, setVendors] = useState([]);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [isClearBtnShown, setIsClearBtnShown] = useState(false);

	const fetchVendors = async () => {
		try {
			const response = await fetch(`${config.backEndBaseUrl}api/user?type=vendor&status=active`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			let filteredVendors = result.data;

			if (startDate && endDate) {
				filteredVendors = filteredVendors.filter(vendor => {
					const createdAt = new Date(vendor.created_at);
					return createdAt >= startDate && createdAt <= endDate;
				});
			}

			setVendors(filteredVendors);
		} catch (error) {
			console.error('Error fetching vendors:', error);
		}
	};

	useEffect(() => {
		fetchVendors();
	}, [startDate, endDate]);

	const handleStartDateChange = (date) => {
		setStartDate(date);
		setIsClearBtnShown(true);
	};

	const handleEndDateChange = (date) => {
		setEndDate(date);
		setIsClearBtnShown(true);
	};

	const hideClearBtn = () => {
		setIsClearBtnShown(false);
		setStartDate(null);
		setEndDate(null);
		fetchVendors();
	};

	const ToggleButton = ({ uid, initialStatus, onUpdate }) => {
		const [status, setStatus] = useState(initialStatus);

		const handleToggleChange = async () => {
			const newStatus = !status;
			try {
				const response = await fetch(`${config.backEndBaseUrl}api/user/vendor/status/${uid}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ status: newStatus ? 1 : 0 }),
				});
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				setStatus(newStatus);
				if (onUpdate) onUpdate();
			} catch (error) {
				console.error('Error updating status:', error);
			}
		};

		return (
			<div className="toggle-container" onClick={handleToggleChange}>
				<div className={`toggle-switch ${status ? 'active' : ''}`}>
					<div className="toggle-knob"></div>
				</div>
				<span className={`toggle-text ${status ? 'active' : ''}`}>{status ? 'active' : 'deactive'}</span>
			</div>
		);
	};

	const columns = useMemo(
		() => [
			{
				accessorKey: 'user_name',
				header: 'Vendor',
			},
			{
				accessorKey: 'phone',
				header: 'Phone',
			},
			{
				accessorKey: 'created_at',
				header: 'Created on',
			},
			{
				accessorKey: 'vendor_status',
				header: 'status',
				Cell: ({ cell }) => (
					<ToggleButton
						uid={cell.row.original.uid}
						initialStatus={cell.getValue() === 'active'}
						onUpdate={() => fetchVendors()}
					/>
				),
			},
			{
				accessorKey: 'store_id',
				header: 'Store',
				Cell: ({ cell }) => (
					<Link className='btn btn-lg btn-success' to={`/admin/store/list?store_id=${cell.row.original.store_id}`}>
						View Store
					</Link>

				),
			},
		],
		[]
	);

	return (
		<>
			<div className="body">
				<div id="wrapper">
					<div id="page" className="">
						<div className="layout-wrap">
							<SectionMenuLeft />
							<div className="section-content-right">
								<div className="main-content" style={{ paddingLeft: isSidebar ? '280px' : '0px' }}>
									<div className="main-content-inner">
										<div className="items-center flex-wrap gap20 mb-27">
											<h3 className="mb-5">Vendors</h3>
											<div style={{
												display: 'flex',
												fontSize: '13px',
												alignItems: 'center',
												gap: '10px',
												zIndex: '10',
												outline: '1px solid lightgray',
												padding: '10px',
												borderRadius: '5px',
												flexWrap: 'wrap'
											}}>
												<DatePicker
													id="startDate"
													selected={startDate}
													onChange={handleStartDateChange}
													dateFormat="dd MMM yyyy"
													placeholderText="Start Date"
													autoComplete='off'
												/>
												<DatePicker
													id="endDate"
													selected={endDate}
													onChange={handleEndDateChange}
													dateFormat="dd MMM yyyy"
													placeholderText="End Date"
													autoComplete='off'
												/>
												{
													isClearBtnShown
													&&
													<button
														className='btn btn-lg btn-dark'
														style={{ width: 'fit-content', padding: '10px 15px', fontSize: '14px' }}
														onClick={() => hideClearBtn()}>
														Clear
													</button>
												}
											</div>
										</div>
										<ReactTable columns={columns} data={vendors} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Vendors;