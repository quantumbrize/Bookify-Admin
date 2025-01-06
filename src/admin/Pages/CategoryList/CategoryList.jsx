import React, { useState, useEffect, useContext, useMemo } from 'react';
import SectionMenuLeft from '../../components/SectionMenuLeft/SectionMenuLeft';
import { AdminSidebarContext } from '../../../context/adminSidebarContext';
import { config } from '../../../config';
import { Link } from 'react-router-dom';
import CustomSelect from '../../components/CustomSelect/CustomSelect.jsx';
import { CategoryRoundIcon, DynamicFaIcon } from '../../components/CategoryIcon/CategoryIcon';
import { FaEdit, FaRegTrashAlt, FaEye } from "react-icons/fa";
import ReactTable from '../../components/ReactTable/ReactTable.jsx';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import './ToggleButton.css'
import './EditableCell.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CategoryList.css"

function CategoryList() {
    const { isSidebar } = useContext(AdminSidebarContext);
    const [categoryCount, setCategoryCount] = useState(0);
    const [selectedOption, setSelectedOption] = useState({ value: 'all', label: 'All' });
    const [categoryList, setCategoryList] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isClearBtnShown, setIsClearBtnShown] = useState(false)

    const handleDelete = (uid) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this category?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            const response = await fetch(`${config.backEndBaseUrl}api/category/delete/${uid}`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            });
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            getCategories(selectedOption.value);
                        } catch (error) {
                            console.error('Error deleting category:', error);
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    };

    const ToggleButton = ({ uid, initialStatus, onUpdate }) => {
        const [status, setStatus] = useState(initialStatus);

        const handleToggleChange = async () => {
            const newStatus = !status;
            try {
                const response = await fetch(`${config.backEndBaseUrl}api/category/update/status/${uid}`, {
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

    const getCategories = async (status, dates) => {
        let params = '';
        if (status !== 'all') {
            params = `?status=${status}`;
        };

        try {
            const response = await fetch(`${config.backEndBaseUrl}api/category/parents${params}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            let categoryList = result.data;


            // Filter based on dates
            if (dates) {
                const { newStartDate, newEndDate } = dates;
                if (newStartDate && newEndDate) {
                    categoryList = categoryList.filter(item => {
                        const createdAt = new Date(item.created_at);
                        return createdAt >= newStartDate && createdAt <= newEndDate;
                    });
                }
            }
            console.log(categoryList)
            setCategoryList(categoryList);
            setCategoryCount(categoryList.length);

        } catch (error) {
            console.error('Fetching categories failed', error);
        }
    };


    useEffect(() => {
        getCategories(selectedOption.value);
    }, [selectedOption.value]);

    const columns = useMemo(
        () => [],
        [selectedOption.value, categoryList]
    );

    const options = useMemo(() => [
        { value: 'all', label: 'All' },
        { value: 1, label: 'Active' },
        { value: 0, label: 'Deactive' },
    ], []);

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        getCategories(selectedOption.value);
    };


    const handleDateChange = (newStartDate, newEndDate) => {
        // console.log(newStartDate, newEndDate);
        let dates = {
            newStartDate: newStartDate,
            newEndDate: newEndDate
        };
        getCategories(selectedOption.value, dates);
        setIsClearBtnShown(true)
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        handleDateChange(date, endDate);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        handleDateChange(startDate, date);
    };

    const hideClearBtn = () => {
        setIsClearBtnShown(false)
        setStartDate(null)
        setEndDate(null)
        getCategories(selectedOption.value);
    }
    return (
        <div className="body">
            <ToastContainer />
            <div id="wrapper">
                <div id="page" className="">
                    <div className="layout-wrap">
                        <SectionMenuLeft />
                        <div className="section-content-right">
                            <div className="main-content" style={{ paddingLeft: isSidebar ? '280px' : '0px' }}>
                                <div className="main-content-inner">
                                    <div className="main-content-wrap">
                                        <div className="flex items-center flex-wrap gap20 mb-27">
                                            <h3>
                                                <span style={{ marginRight: 40 }}>All Category Count : <b>{categoryCount}</b></span>
                                            </h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
                                                <Link to="/admin/category/add">
                                                    <button className='btn btn-lg btn-success' style={{ width: 'fit-content', padding: '10px 15px', fontSize: '14px' }}>
                                                        Add Category
                                                    </button>
                                                </Link>
                                                <CustomSelect
                                                    options={options}
                                                    onChange={handleChange}
                                                    value={options.find(option => option.value === selectedOption.value)}
                                                />
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
                                        </div>
                                        <ReactTable columns={columns} data={categoryList} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryList;
