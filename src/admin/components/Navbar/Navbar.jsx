import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { config } from '../../../config';
import { AdminSidebarContext } from '../../../context/adminSidebarContext';
import { useContext } from 'react';
import './Navbar.css'

function Header() {
	const navigate = useNavigate();
	const [userData, setUserData] = useState(null)
	const { frontEndBaseUrl } = config;
	const { toggle, isSidebar } = useContext(AdminSidebarContext);
	const [logo, setLogo] = useState('')
	const [userImage, setUserImage] = useState('')
	const handleLogout = () => {
		localStorage.removeItem('adminUserId')
		localStorage.removeItem('adminAuthToken')
		window.location.href = '/admin';
	}

	let uid = localStorage.getItem('adminUserId')
	const fetchAdmin = async (uid) => {
		try {

			// Send the request
			const response = await fetch(`${config.backEndBaseUrl}api/user/${uid}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			if (result.status) {
				setUserData(result.data)
				setLogo(result.data.seoDetails.logo == '' ? config.backEndBaseUrl + config.placeHolderImage : config.backEndBaseUrl + result.data.seoDetails.logo || '')
				setUserImage(result.data.profile_image == '' ? config.backEndBaseUrl + config.placeHolderImage : config.backEndBaseUrl + result.data.profile_image || '')
			} else {
				console.log('internal server error')
			}

		} catch (error) {
			console.error('Error update data:', error);
		}
	}

	useEffect(() => {
		fetchAdmin(uid)
	}, [uid])


	return (
		<>
			{/* header-dashboard */}
			<div className="header-dashboard" style={{ width: isSidebar ? 'calc(100% - 280px)' : '100%' }}>
				<div className="wrap">
					<div className="header-left">
						<Link to="/admin/home" style={{ display: isSidebar ? 'none' : 'block' }}>
							<img className="" id="logo_header_mobile" alt="logo_header" src={`${logo}`} />
						</Link>
						<div className="button-show-hide" style={{ display: isSidebar ? 'none' : 'block' }} onClick={toggle}>
							<i className="icon-menu-left"></i>
						</div>
						{/* <form className="form-search flex-grow">
                            <fieldset className="name">
                                <input type="text" placeholder="Search here..." className="show-search" name="name" tabIndex="2" value="" aria-required="true" required="" />
                            </fieldset>
                            <div className="button-submit">
                                <button className="" type="submit"><i className="icon-search"></i></button>
                            </div>
                            <div className="box-content-search" id="box-content-search">
                                <ul className="mb-24">
                                    <li className="mb-14">
                                        <div className="body-title">Top selling product</div>
                                    </li>
                                    <li className="mb-14">
                                        <div className="divider"></div>
                                    </li>
                                    <li>
                                        <ul>
                                            <li className="product-item gap14 mb-10">
                                                <div className="image no-bg">
                                                    <img src={`${frontEndBaseUrl}adminAssets/images/products/17.png`} alt="products_img" />
                                                </div>
                                                <div className="flex items-center justify-between gap20 flex-grow">
                                                    <div className="name">
                                                        <Link to="#" className="body-text">Dog Food Rachael Ray Nutrish®</Link>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mb-10">
                                                <div className="divider"></div>
                                            </li>
                                            <li className="product-item gap14 mb-10">
                                                <div className="image no-bg">
                                                    <img src={`${frontEndBaseUrl}adminAssets/images/products/18.png`} alt="products_img" />
                                                </div>
                                                <div className="flex items-center justify-between gap20 flex-grow">
                                                    <div className="name">
                                                        <Link to="#" className="body-text">Natural Dog Food Healthy Dog Food</Link>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mb-10">
                                                <div className="divider"></div>
                                            </li>
                                            <li className="product-item gap14">
                                                <div className="image no-bg">
                                                    <img src={`${frontEndBaseUrl}adminAssets/images/products/19.png`} alt="products_img" />
                                                </div>
                                                <div className="flex items-center justify-between gap20 flex-grow">
                                                    <div className="name">
                                                        <Link to="#" className="body-text">Freshpet Healthy Dog Food and Cat</Link>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <ul className="">
                                    <li className="mb-14">
                                        <div className="body-title">Order product</div>
                                    </li>
                                    <li className="mb-14">
                                        <div className="divider"></div>
                                    </li>
                                    <li>
                                        <ul>
                                            <li className="product-item gap14 mb-10">
                                                <div className="image no-bg">
                                                    <img src={`${frontEndBaseUrl}adminAssets/images/products/20.png`} alt="products_img" />
                                                </div>
                                                <div className="flex items-center justify-between gap20 flex-grow">
                                                    <div className="name">
                                                        <Link to="#" className="body-text">Sojos Crunchy Natural Grain Free...</Link>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mb-10">
                                                <div className="divider"></div>
                                            </li>
                                            <li className="product-item gap14 mb-10">
                                                <div className="image no-bg">
                                                    <img src={`${frontEndBaseUrl}adminAssets/images/products/21.png`} alt="products_img" />
                                                </div>
                                                <div className="flex items-center justify-between gap20 flex-grow">
                                                    <div className="name">
                                                        <Link to="#" className="body-text">Kristin Watson</Link>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mb-10">
                                                <div className="divider"></div>
                                            </li>
                                            <li className="product-item gap14 mb-10">
                                                <div className="image no-bg">
                                                    <img src={`${frontEndBaseUrl}adminAssets/images/products/22.png`} alt="products_img" />
                                                </div>
                                                <div className="flex items-center justify-between gap20 flex-grow">
                                                    <div className="name">
                                                        <Link to="#" className="body-text">Mega Pumpkin Bone</Link>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="mb-10">
                                                <div className="divider"></div>
                                            </li>
                                            <li className="product-item gap14">
                                                <div className="image no-bg">
                                                    <img src={`${frontEndBaseUrl}adminAssets/images/products/23.png`} alt="products_img" />
                                                </div>
                                                <div className="flex items-center justify-between gap20 flex-grow">
                                                    <div className="name">
                                                        <Link to="#" className="body-text">Mega Pumpkin Bone</Link>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </form> */}
					</div>
					<div className="header-grid">
						{/* <div className="header-item country">
                            <select className="image-select no-text">
                                <option data-thumbnail={`${frontEndBaseUrl}adminAssets/images/country/3.png`}>IND</option>
                                <option data-thumbnail={`${frontEndBaseUrl}adminAssets/images/country/1.png`}>ENG</option>
                            </select>
                        </div>
                        <div className="header-item button-dark-light">
                            <i className="icon-moon"></i>
                        </div>
                        <div className="popup-wrap noti type-header">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="header-item">
                                        <span className="text-tiny">1</span>
                                        <i className="icon-bell"></i>
                                    </span>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end has-content" aria-labelledby="dropdownMenuButton1" >
                                    <li>
                                        <h6>Message</h6>
                                    </li>
                                    <li>
                                        <div className="noti-item w-full wg-user active">
                                            <div className="image">
                                                <img src={`${frontEndBaseUrl}adminAssets/images/avatar/user-11.png`} alt="avatar_img" />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-center justify-between">
                                                    <Link to="#" className="body-title">Cameron Williamson</Link>
                                                    <div className="time">10:13 PM</div>
                                                </div>
                                                <div className="text-tiny">Hello?</div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="noti-item w-full wg-user active">
                                            <div className="image">
                                                <img src={`${frontEndBaseUrl}adminAssets/images/avatar/user-12.png`} alt="avatar_img" />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-center justify-between">
                                                    <Link to="#" className="body-title">Ralph Edwards</Link>
                                                    <div className="time">10:13 PM</div>
                                                </div>
                                                <div className="text-tiny">Are you there?  interested i this...</div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="noti-item w-full wg-user active">
                                            <div className="image">
                                                <img src={`${frontEndBaseUrl}adminAssets/images/avatar/user-13.png`} alt="avatar_img" />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-center justify-between">
                                                    <Link to="#" className="body-title">Eleanor Pena</Link>
                                                    <div className="time">10:13 PM</div>
                                                </div>
                                                <div className="text-tiny">Interested in this loads?</div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="noti-item w-full wg-user active">
                                            <div className="image">
                                                <img src={`${frontEndBaseUrl}adminAssets/images/avatar/user-11.png`} alt="avatar_img" />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-center justify-between">
                                                    <Link to="#" className="body-title">Jane Cooper</Link>
                                                    <div className="time">10:13 PM</div>
                                                </div>
                                                <div className="text-tiny">Okay...Do we have a deal?</div>
                                            </div>
                                        </div>
                                    </li>
                                    <li><Link to="#" className="tf-button w-full">View all</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="header-item button-zoom-maximize">
                            <div className="">
                                <i className="icon-maximize"></i>
                            </div>
                        </div> */}

						<div className="popup-wrap user type-header">
							<div className="dropdown">
								<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton3" data-bs-toggle="dropdown" aria-expanded="false">
									<span className="header-user wg-user">
										<span className="image">
											<img src={`${userImage}`} class="userImage" alt="avatar_img" />
										</span>
										<span className="flex flex-column">
											<span className="body-title mb-2">Admin</span>
											{/* <span className="text-tiny">Admin</span> */}
										</span>
									</span>
								</button>
								<ul className="dropdown-menu dropdown-menu-end has-content" aria-labelledby="dropdownMenuButton3" >
									<li>
										<Link to="setting" className="user-item">
											<div className="icon">
												<i className="icon-user"></i>
											</div>
											<div className="body-title-2">Setting</div>
										</Link>
									</li>
									{/* <li>
                                        <Link to="setting.html" className="user-item">
                                            <div className="icon">
                                                <i className="icon-settings"></i>
                                            </div>
                                            <div className="body-title-2">Setting</div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="user-item">
                                            <div className="icon">
                                                <i className="icon-headphones"></i>
                                            </div>
                                            <div className="body-title-2">Support</div>
                                        </Link>
                                    </li> */}
									<li>
										<Link to="" className="user-item" onClick={() => handleLogout()}>
											<div className="icon">
												<i className="icon-log-out"></i>
											</div>
											<div className="body-title-2">Log out</div>
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>


		</>
	)
}

export default Header