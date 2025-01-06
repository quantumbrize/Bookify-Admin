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
    let [isActiveSubCat, setIsActiveSubCat] = useState(false);
    let [isActiveStore, setIsActiveStore] = useState(false);
    let [isActiveBanner, setIsActiveBanner] = useState(false);

    const toggleSubMenu = (state, func) => {
        func(!state);
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
                                    <div className="icon"><i className="icon-layers"></i></div>
                                    <div className="text">Category</div>
                                </Link>
                                <ul className="sub-menu">
                                    <li className="sub-menu-item">
                                        <Link to="/admin/category/list" className="">
                                            <div className="text" onClick={handleSidebarClose}>Category list</div>
                                        </Link>
                                    </li>
                                    <li className="sub-menu-item">
                                        <Link to="/admin/category/add" className="">
                                            <div className="text" onClick={handleSidebarClose}>Add category</div>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={`menu-item has-children ${isActiveSubCat ? 'active' : ''}`} onClick={() => toggleSubMenu(isActiveSubCat, setIsActiveSubCat)}>
                                <Link to="javascript:void(0);" className="menu-item-button">
                                    <div className="icon"><i className="icon-file"></i></div>
                                    <div className="text">Sub Category</div>
                                </Link>
                                <ul className="sub-menu">
                                    <li className="sub-menu-item">
                                        <Link to="/admin/sub-category/list" className="">
                                            <div className="text" onClick={handleSidebarClose}>Sub Category List</div>
                                        </Link>
                                    </li>
                                    <li className="sub-menu-item">
                                        <Link to="/admin/sub-category/add" className="">
                                            <div className="text" onClick={handleSidebarClose}>Add Sub Category</div>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={`menu-item has-children ${isActiveStore ? 'active' : ''}`} onClick={() => toggleSubMenu(isActiveStore, setIsActiveStore)}>
                                <Link to="javascript:void(0);" className="menu-item-button">
                                    <div className="icon"><i className="icon-shopping-cart"></i></div>
                                    <div className="text">Store</div>
                                </Link>
                                <ul className="sub-menu">
                                    <li className="sub-menu-item">
                                        <Link to="/admin/store/list" className="">
                                            <div className="text" onClick={handleSidebarClose}>Store List</div>
                                        </Link>
                                    </li>
                                    <li className="sub-menu-item">
                                        <Link to="/admin/store/add" className="">
                                            <div className="text" onClick={handleSidebarClose}>Add Store</div>
                                        </Link>
                                    </li>
                                    <li className="sub-menu-item">
                                        <Link to="/admin/store/orders" className="">
                                            <div className="text" onClick={handleSidebarClose}>Orders</div>
                                        </Link>
                                    </li>

                                </ul>
                            </li>
                            <li className={`menu-item has-children ${isActiveBanner ? 'active' : ''}`} onClick={() => toggleSubMenu(isActiveBanner, setIsActiveBanner)}>
                                <Link to="javascript:void(0);" className="menu-item-button">
                                    <div className="icon"><i className="icon-flag"></i></div>
                                    <div className="text">Promotion Banners</div>
                                </Link>
                                <ul className="sub-menu">
                                    {/* <li className="sub-menu-item">
                                        <Link to="/admin/category/banner/add" className="">
                                            <div className="text" onClick={handleSidebarClose}>Add Category Banners</div>
                                        </Link>
                                    </li>
                                    <li className="sub-menu-item">
                                        <Link to="/admin/banner/add" className="">
                                            <div className="text" onClick={handleSidebarClose}>Add Home Banner</div>
                                        </Link>
                                    </li> */}
                                    <li className="sub-menu-item">
                                        <Link to="/admin/banner/list" className="">
                                            <div className="text" onClick={handleSidebarClose}>All Banners</div>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            {/* <li className="menu-item ">
                                <Link to="javascript:void(0);" className="menu-item-button">
                                    <div className="icon"><i className="icon-file"></i></div>
                                    <div className="text">Promotion</div>
                                </Link>
                            </li> */}
                            <li className="menu-item">
                                <Link to="/admin/vendors" className="">
                                    <div className="icon"><i className="icon-users"></i></div>
                                    <div className="text" onClick={handleSidebarClose}>Vendors</div>
                                </Link>
                            </li>
                            <li className="menu-item">
                                <Link to="/admin/queries" className="">
                                    <div className="icon"><i className="icon-circle"></i></div>
                                    <div className="text" onClick={handleSidebarClose}>Queries</div>
                                </Link>
                            </li>
                            <li className="menu-item">
                                <Link to="/admin/notifications" className="menu-item-button">
                                    <div className="icon"><i className="icon-alert-octagon"></i></div>
                                    <div className="text" onClick={handleSidebarClose}>Push Notifications</div>
                                </Link>
                            </li>
                            <li className="menu-item">
                                <Link to="/admin/about" className="menu-item-button">
                                    <div className="icon"><i className="icon-alert-octagon"></i></div>
                                    <div className="text" onClick={handleSidebarClose}>About</div>
                                </Link>
                            </li>

                        </ul>
                    </div>
                    {/* <div className="center-item">
                        <div className="center-heading">Support</div>
                        <ul className="menu-list">
                            <li className="menu-item">
                                <Link to="#" className="">
                                    <div className="icon"><i className="icon-help-circle"></i></div>
                                    <div className="text">Help center</div>
                                </Link>
                            </li>
                            <li className="menu-item">
                                <Link to="#" className="">
                                    <div className="icon">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.7727 4.27031C15.025 3.51514 14.1357 2.91486 13.1558 2.50383C12.1758 2.09281 11.1244 1.87912 10.0617 1.875H10C7.84512 1.875 5.77849 2.73102 4.25476 4.25476C2.73102 5.77849 1.875 7.84512 1.875 10V14.375C1.875 14.8723 2.07254 15.3492 2.42417 15.7008C2.77581 16.0525 3.25272 16.25 3.75 16.25H5C5.49728 16.25 5.9742 16.0525 6.32583 15.7008C6.67746 15.3492 6.875 14.8723 6.875 14.375V11.25C6.875 10.7527 6.67746 10.2758 6.32583 9.92417C5.9742 9.57254 5.49728 9.375 5 9.375H3.15313C3.27366 8.07182 3.76315 6.83 4.56424 5.79508C5.36532 4.76016 6.44481 3.97502 7.67617 3.53169C8.90753 3.08836 10.2398 3.0052 11.5167 3.29196C12.7936 3.57872 13.9624 4.22352 14.8859 5.15078C16.0148 6.28539 16.7091 7.78052 16.8477 9.375H15C14.5027 9.375 14.0258 9.57254 13.6742 9.92417C13.3225 10.2758 13.125 10.7527 13.125 11.25V14.375C13.125 14.8723 13.3225 15.3492 13.6742 15.7008C14.0258 16.0525 14.5027 16.25 15 16.25H16.875C16.875 16.7473 16.6775 17.2242 16.3258 17.5758C15.9742 17.9275 15.4973 18.125 15 18.125H10.625C10.4592 18.125 10.3003 18.1908 10.1831 18.3081C10.0658 18.4253 10 18.5842 10 18.75C10 18.9158 10.0658 19.0747 10.1831 19.1919C10.3003 19.3092 10.4592 19.375 10.625 19.375H15C15.8288 19.375 16.6237 19.0458 17.2097 18.4597C17.7958 17.8737 18.125 17.0788 18.125 16.25V10C18.1291 8.93717 17.9234 7.88398 17.5197 6.90077C17.1161 5.91757 16.5224 5.02368 15.7727 4.27031ZM5 10.625C5.16576 10.625 5.32473 10.6908 5.44194 10.8081C5.55915 10.9253 5.625 11.0842 5.625 11.25V14.375C5.625 14.5408 5.55915 14.6997 5.44194 14.8169C5.32473 14.9342 5.16576 15 5 15H3.75C3.58424 15 3.42527 14.9342 3.30806 14.8169C3.19085 14.6997 3.125 14.5408 3.125 14.375V10.625H5ZM15 15C14.8342 15 14.6753 14.9342 14.5581 14.8169C14.4408 14.6997 14.375 14.5408 14.375 14.375V11.25C14.375 11.0842 14.4408 10.9253 14.5581 10.8081C14.6753 10.6908 14.8342 10.625 15 10.625H16.875V15H15Z" fill="#111111" />
                                        </svg>
                                    </div>
                                    <div className="text">FAQs</div>
                                </Link>
                            </li>
                            <li className="menu-item">
                                <Link to="#" className="">
                                    <div className="icon">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_604_18468)">
                                                <path d="M4.71875 7V1H15.5561L18.9991 4.44801V19H4.71875C4.71875 19 4.71875 16.2 4.71875 13.5" stroke="#111111" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M19.0015 4.44801H15.5586V1L19.0015 4.44801Z" stroke="#111111" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M7.53469 14.5507C9.89243 14.5507 11.8037 12.6366 11.8037 10.2754C11.8037 7.91415 9.89243 6 7.53469 6C5.17695 6 3.26562 7.91415 3.26562 10.2754C3.26562 12.6366 5.17695 14.5507 7.53469 14.5507Z" stroke="#111111" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M5.41029 13.9852L2.90967 16.4895C2.47263 16.9272 1.76451 16.9272 1.3275 16.4895C0.890833 16.0522 0.890833 15.3427 1.3275 14.9054L3.82812 12.4011M6.14799 10.2051L7.11794 11.175L8.91794 9.375" stroke="#111111" stroke-width="1.2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_604_18468">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div className="text">Privacy policy</div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="center-item">
                        <div className="center-heading">Connect us</div>
                        <ul className="wg-social">
                            <li>
                                <Link to="#"><i className="icon-facebook"></i></Link>
                            </li>
                            <li className="active">
                                <Link to="#"><i className="icon-twitter"></i></Link>
                            </li>
                            <li>
                                <Link to="#"><i className="icon-linkedin"></i></Link>
                            </li>
                            <li>
                                <Link to="#"><i className="icon-instagram"></i></Link>
                            </li>
                        </ul>
                    </div> */}
                </div>
                <div className="bot text-center">
                    <div className="wrap">
                        <div className="mb-20">
                            <img src={`${frontEndBaseUrl}adminAssets/images/menu-left/img-bot.png`} alt="img-bot" />
                        </div>
                        <div className="mb-20">
                            <h6>Hi, how can we help?</h6>
                            <div className="text">Contact us if you have any assistance, we will contact you as soon as possible</div>
                        </div>
                        <Link to="#" className="tf-button w-full">Contact</Link>
                    </div>
                </div>
            </div>
            {/* /section-menu-left */}

        </>
    )
}

export default SectionMenuLeft