import React, { useMemo, useState } from 'react';
import ReactTable from '../../components/ReactTable/ReactTable.jsx';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaEdit, FaRegTrashAlt, FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Users({ users }) {

    // const [startDate, setStartDate] = useState(null);
    // const [endDate, setEndDate] = useState(null);
    // const [isClearBtnShown, setIsClearBtnShown] = useState(false)

    // // date filter section start
    // const handleDateChange = (newStartDate, newEndDate) => {
    //     let dates = {
    //         newStartDate: newStartDate,
    //         newEndDate: newEndDate
    //     };
    //     setIsClearBtnShown(true)
    // };

    // const handleStartDateChange = (date) => {
    //     setStartDate(date);
    //     handleDateChange(date, endDate);
    // };

    // const handleEndDateChange = (date) => {
    //     setEndDate(date);
    //     handleDateChange(startDate, date);
    // };

    // const hideClearBtn = () => {
    //     setIsClearBtnShown(false)
    //     setStartDate(null)
    //     setEndDate(null)
    // }
    // // date filter section end

    // table section start
    const columns = useMemo(
        () => [
            {
                accessorKey: 'user_name', 
                header: 'Name',
            },
            {
                accessorKey: 'phone', 
                header: 'Number',
            },
            {
                accessorKey: 'gender', 
                header: 'Gender',
            },
            {
                accessorKey: 'uid',
                header: 'analytics',
                Cell: ({ cell }) => (
                    <>
                        <Link className='actionBtn btn btn-lg btn-success' to={`/admin/user/leads/${cell.row.original.uid}`}>
                            <FaEye /> {formatNumber(cell.row.original.total_clicks)}
                        </Link>
                    </>
                ),
            },
        ],
        []
    );

    function formatNumber(number) {
        if (number >= 1000000) {
            return (number / 1000000).toFixed(1) + 'm';
        } else if (number >= 1000) {
            return (number / 1000).toFixed(1) + 'k';
        }
        return number;
    }
    

    // Use users data passed as a prop
    const data = useMemo(() => users || [], [users]);
    // table section end

    return (
        <>
            {/* product-overview */}
            <div className="main-content-wrap">
                <div className="tf-section">
                    <div className="wg-box" style={{marginBottom: '20px'}}>
                        <div className="flex items-center justify-between">
                            <h5>Users overview</h5>
                            {/* date filter */}
                            {/* <div className="flex items-center flex-wrap gap20 mb-27 date-pick">
                                <div className='DatePicker-wrap' style={{
                                    display: 'flex',
                                    fontSize: '13px',
                                    alignItems: 'center',
                                    gap: '10px',
                                    zIndex: '10',
                                    outline: '1px dashed lightgray',
                                    padding: '15px',
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
                                            className='btn btn-lg'
                                            style={{ width: 'fit-content', padding: '4px 10px', fontSize: '12px', backgroundColor: '#505356', color: '#fff' }}
                                            onClick={() => hideClearBtn()}>
                                            Clear
                                        </button>
                                    }
                                </div>
                            </div> */}
                        </div>
                        {/* Pass both columns and data to ReactTable */}
                        <ReactTable columns={columns} data={data} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Users;
