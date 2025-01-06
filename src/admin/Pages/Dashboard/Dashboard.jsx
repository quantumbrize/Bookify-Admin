import React, { useEffect, useState, useContext } from 'react';
import './Dashboard.css';
import SectionMenuLeft from '../../components/SectionMenuLeft/SectionMenuLeft';
import TopDefaultCharts from './TopDefaultCharts';
import ProductOverview from './ProductOverview';
import Users from './Users';
import Vendor from './Vendor';
import CustomerGrowth from './CustomerGrowth';
import Revenue from './Revenue';
import { AdminSidebarContext } from '../../../context/adminSidebarContext';
import { config } from '../../../config';

function Dashboard() {
    const { isSidebar } = useContext(AdminSidebarContext);
    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const response = await fetch(`${config.backEndBaseUrl}api/user?type=user&status=active`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result.status) {
                setUsers(result.data);
            }
        } catch (error) {
            console.error('Fetching users failed', error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

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
                                        <TopDefaultCharts />
                                        <Users users={users} />
                                        <ProductOverview />
                                        <br />
                                        <br />
                                        <Vendor />
                                        <div className="tf-section-6 mb-30">
                                            <CustomerGrowth />
                                            <Revenue />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;