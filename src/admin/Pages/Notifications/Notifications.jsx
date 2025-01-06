import React, { useState } from 'react'
import './notifications.css'
import InputArea from './InputArea/InputArea'
import SectionMenuLeft from '../../components/SectionMenuLeft/SectionMenuLeft';
import { AdminSidebarContext } from '../../../context/adminSidebarContext';
import { useContext } from 'react';

const Notifications = () => {
    const [tab, setTab] = useState("all")
    const { isSidebar } = useContext(AdminSidebarContext);

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
                                            <h3>Push Notification</h3>
                                        </div>
                                        <div className='notifications'>
                                            <div className="main-box">
                                                <InputArea tab={tab} setTab={setTab} />
                                            </div>
                                        </div>
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
export default Notifications