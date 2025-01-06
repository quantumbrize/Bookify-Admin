import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { config } from '../../../config';
import { AdminSidebarContext } from '../../../context/adminSidebarContext';
import { useContext } from 'react';

function SectionMenuLeft() {
    const { frontEndBaseUrl } = config;
    const { toggle, isSidebar } = useContext(AdminSidebarContext);
    const sidebarRef = useRef(null);

    let [isActiveCat, setIsActiveCat] = useState(false);

    const toggleSubMenu = (state, func, forceState = null) => {
        func(forceState !== null ? forceState : !state);
    };

    // side bar close on outside clicking
    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target) && window.innerWidth <= 768) {
            if (isSidebar) {
                toggle();
            };
        };
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebar]);

    // Side bar close on side nav link clicking
    const handleSidebarClose = () => {
        if (window.innerWidth <= 768) {
            toggle();
        };
    };

    return (
        <>

            {/* section-menu-left */}
            <div ref={sidebarRef} className="section-menu-left" style={{ left: isSidebar ? '0px' : '-100%' }}>
                <div className="box-logo" style={{ left: isSidebar ? '0px' : '-100%' }}>
                    <Link to="/admin" id="site-logo-inner">
                        <img className="" id="logo_header" alt="logo" src={`${frontEndBaseUrl}adminAssets/images/logo.png`} />
                    </Link>
                    <div className="button-show-hide" onClick={toggle}>
                        <i className="icon-menu-left"></i>
                    </div>
                </div>
                <div className="center">
                    <div className="center-item">
                        <div className="center-heading">Main Home</div>
                        <ul className="menu-list">
                            <li className="menu-item">
                                <Link to="/admin" className="menu-item-button">
                                    <div className="icon"><i className="icon-menu"></i></div>
                                    <div className="text" onClick={handleSidebarClose}>Dashboard</div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="center-item">
                        <div className="center-heading">All page</div>
                        <ul className="menu-list">

                            <li className={`menu-item has-children ${isActiveCat ? 'active' : ''}`} onClick={() => toggleSubMenu(isActiveCat, setIsActiveCat)}>
                                <Link to="javascript:void(0);" className="menu-item-button">
                                    <div className="icon">
                                        <i className="icon-layers"></i>
                                    </div>
                                    <div className="text">Category</div>
                                </Link>
                                <ul className="sub-menu">
                                    <li className="sub-menu-item">
                                        <Link to="/admin/category/list" className="">
                                            <div className="text" onClick={handleSidebarClose}>Category list</div>
                                        </Link>
                                    </li>
                                    <li className="sub-menu-item" >
                                        <Link to="/admin/category/add" className="">
                                            <div className="text" onClick={handleSidebarClose}>Add category</div>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
            {/* /section-menu-left */}

        </>
    )
}

export default SectionMenuLeft