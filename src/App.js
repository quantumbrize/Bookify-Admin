import './App.css';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { createBrowserRouter, Navigate, Outlet, RouterProvider, useLocation } from 'react-router-dom';
import { AdminSidebarContextProvider } from './context/adminSidebarContext';
import Loading from './Loading/Loading';
import loadAssets from './utils/loadAssets';
// Lazy loaded components for admin
const UpdateStore = lazy(() => import('./admin/Pages/UpdateStore/UpdateStore'));
const AdminLogin = lazy(() => import('./admin/Pages/AdminLogin/AdminLogin'));
const AdminNavbar = lazy(() => import('./admin/components/Navbar/Navbar'));
const AdminFooter = lazy(() => import('./admin/components/Footer/Footer'));
const Dashboard = lazy(() => import('./admin/Pages/Dashboard/Dashboard'));
const AdminComponents = lazy(() => import('./admin/Pages/AdminComponents/AdminComponents'));
const AddStore = lazy(() => import('./admin/Pages/AddStore/AddStore'));
const AddStoreKeywords = lazy(() => import('./admin/Pages/AddStoreKeywords/AddStoreKeywords'));
const StoreList = lazy(() => import('./admin/Pages/StoreList/StoreList'));
const CategoryList = lazy(() => import('./admin/Pages/CategoryList/CategoryList'));
const NewCategory = lazy(() => import('./admin/Pages/NewCategory/NewCategory'));
const SubCategory = lazy(() => import('./admin/Pages/SubCategory/SubCategory'));
const SubCategoryList = lazy(() => import('./admin/Pages/SubCategorylist/SubCategoryList'));
const AddBanners = lazy(() => import('./admin/Pages/AddBanners/AddBanners'));
const AllBanners = lazy(() => import('./admin/Pages/AllBanners/AllBanners'));
const CategoryUpdate = lazy(() => import('./admin/Pages/CategoryUpdate/CategoryUpdate'));
const SubCategoryUpdateForm = lazy(() => import('./admin/Pages/SubCategoryUpdate/SubCategoryUpdate'))
const Notifications = lazy(() => import('./admin/Pages/Notifications/Notifications'))
const BannersImages = lazy(() => import('./admin/Pages/BannersImages/BannersImages'))
const AdminSetting = lazy(() => import('./admin/Pages/AdminSetting/AdminSetting'))
const BannerUpdate = lazy(() => import('./admin/Pages/BannerUpdate/BannerUpdate'))
const AddBannerIamge = lazy(() => import('./admin/Pages/AddBannerIamge/AddBannerIamge'))
const BannersImagesUpdate = lazy(() => import('./admin/Pages/BannersImagesUpdate/BannersImagesUpdate'))
const AddCategoryBanner = lazy(() => import('./admin/Pages/AddCategoryBanner/AddCategoryBanner'))
const CategoryBannerImages = lazy(() => import('./admin/Pages/CategoryBannerImages/CategoryBannerImages'))
const UpdateCategoryBanner = lazy(() => import('./admin/Pages/UpdateCategoryBanner/UpdateCategoryBanner'))
const StoreImages = lazy(() => import('./admin/Pages/StoreImages/StoreImages'))
const AddCoverImage = lazy(() => import('./admin/Pages/StoreImages/CoverImages/AddCoverImage/AddCoverImage'))
const AddStoreBannerImage = lazy(() => import('./admin/Pages/StoreImages/BannerImages/AddStoreBannerImage/AddStoreBannerImage'))
const AddStoreGallaryImage = lazy(() => import('./admin/Pages/StoreImages/GallaryImages/AddGallaryImage/AddGallaryImage'))
const YoutubeVideosAdd = lazy(() => import('./admin/Pages/StoreImages/YoutubeVideos/YoutubeVideosAdd/YoutubeVideosAdd'))
const AddLogo = lazy(() => import('./admin/Pages/StoreImages/LogoImage/AddLogo/AddLogo'))
const StoreProducts = lazy(() => import('./admin/Pages/StoreProducts/StoreProducts'))
const AddProduct = lazy(() => import('./admin/Pages/StoreProducts/AddProduct/AddProduct'))
const UpdateProduct = lazy(() => import('./admin/Pages/StoreProducts/UpdateProduct/UpdateProduct'))
const UpdateStoreImage = lazy(() => import('./admin/Pages/StoreImages/UpdateStoreImage/UpdateStoreImage'))
const ProductImages = lazy(() => import('./admin/Pages/StoreProducts/ProductImages/ProductImages'))
const AddProductImage = lazy(() => import('./admin/Pages/StoreProducts/AddProductImage/AddProductImage'))
const UpdateProductImage = lazy(() => import('./admin/Pages/StoreProducts/UpdateProductImage/UpdateProductImage'))
const Orders = lazy(() => import('./admin/Pages/Orders/Orders'))
const Queries = lazy(() => import('./admin/Pages/Queries/Queries'))
const Vendors = lazy(() => import('./admin/Pages/Vendor/Vendors'))
const VendorsAdd = lazy(() => import('./admin/Pages/VendorsAdd/VendorsAdd'))
const StoreComments = lazy(() => import('./admin/Pages/StoreComments/StoreComments'))
const Leads = lazy(() => import('./admin/Pages/Leads/Leads'))
const UserLeads = lazy(() => import('./admin/Pages/UserLeads/UserLeads'))
const UpdateComment = lazy(() => import('./admin/Pages/StoreComments/UpdateComment/UpdateComment'))
const AddMember = lazy(() => import('./admin/Pages/AdminAbout/AddMember/AddMember'))
const UpdateAbout = lazy(() => import('./admin/Pages/AdminAbout/UpdateAbout/UpdateAbout'))


function App() {
	useEffect(() => {
		const isAdmin = window.location.href.includes('admin');
		loadAssets(isAdmin);
	}, []);



	let currentAdmin = localStorage.getItem('adminAuthToken');
	// let currentVendor = true;




	// Admin layout start
	const ProtectedRouteAdmin = ({ children }) => {
		if (currentAdmin) {
			return children;
		}
		return <Navigate to="/admin/login" />;
	};

	const LayoutAdmin = () => {
		const location = useLocation();
		useEffect(() => {
			window.scrollTo(0, 0);
		}, [location.pathname]);

		return (
			<>
				<Suspense fallback={<Loading />}>
					<AdminNavbar />
					<Outlet />
					<AdminFooter />
				</Suspense>
			</>
		);
	};
	// Admin layout end


	// ----All Routes---
	const router = createBrowserRouter([

		// ------admin routes--------
		{
			path: '/admin',
			element: (
				<ProtectedRouteAdmin>
					<LayoutAdmin />
				</ProtectedRouteAdmin>
			),
			children: [
				{
					path: '/admin',
					element: <Dashboard />,
				},
				{
					path: '/admin/store/add',
					element: <AddStore />,
				},
				{
					path: '/admin/store/keywords/add',
					element: <AddStoreKeywords />,
				},
				{
					path: '/admin/store/update/:uid',
					element: <UpdateStore />,
				},
				{
					path: '/admin/store/list',
					element: <StoreList />,
				},
				{
					path: '/admin/banner/add',
					element: <AddBanners />,
				},
				{
					path: '/admin/banner/list',
					element: <AllBanners />,
				},
				{
					path: '/admin/category/banner/image/:uid',
					element: <CategoryBannerImages />,
				},
				{
					path: '/admin/banner/image/add/:uid',
					element: <AddBannerIamge />,
				},
				{
					path: '/admin/store/comments/:uid',
					element: <StoreComments />
				},
				{
					path: '/admin/banner/image/update/:uid/',
					element: <BannersImagesUpdate />,
				},
				{
					path: '/admin/product/update/:uid/',
					element: <UpdateProduct />,
				},
				{
					path: '/admin/store/image/update/:uid/',
					element: <UpdateStoreImage />,
				},
				{
					path: '/admin/product/images/:uid',
					element: <ProductImages />,
				},
				{
					path: '/admin/store/product/image/add/:uid',
					element: <AddProductImage />,
				},
				{
					path: '/admin/product/image/update/:uid',
					element: <UpdateProductImage />,
				},
				{
					path: '/admin/banner/update/:uid',
					element: <BannerUpdate />,
				},
				{
					path: '/admin/banner/image/:uid',
					element: <BannersImages />,
				},
				{
					path: '/admin/category/list',
					element: <CategoryList />,
				},
				{
					path: '/admin/components',
					element: <AdminComponents />,
				},
				{
					path: '/admin/category/add',
					element: <NewCategory />,
				},
				{
					path: '/admin/store/images/:uid',
					element: <StoreImages />
				},
				{
					path: '/admin/store/product/add/:uid',
					element: <AddProduct />
				},
				{
					path: '/admin/store/products/:uid',
					element: <StoreProducts />
				},
				{
					path: '/admin/store/cover/add/:uid',
					element: <AddCoverImage />
				},
				{
					path: '/admin/store/logo/add/:uid',
					element: <AddLogo />
				},
				{
					path: '/admin/store/video/add/:uid',
					element: <YoutubeVideosAdd />
				},
				{
					path: '/admin/store/banner/add/:uid',
					element: <AddStoreBannerImage />
				},
				{
					path: '/admin/store/gallary/add/:uid',
					element: <AddStoreGallaryImage />
				},
				{
					path: '/admin/store/orders',
					element: <Orders />
				},
				{
					path: '/admin/queries',
					element: <Queries />
				},
				{
					path: '/admin/vendors',
					element: <Vendors />
				},
				{
					path: '/admin/vendors/add',
					element: <VendorsAdd />
				},
				{
					path: '/admin/category/update/:uid',
					element: <CategoryUpdate />,
				},
				{
					path: '/admin/sub-category/update/:uid',
					element: <SubCategoryUpdateForm />,
				},
				{
					path: '/admin/sub-category/add/:uid',
					element: <SubCategory />,
				},
				{
					path: '/admin/sub-category/add/',
					element: <SubCategory />,
				},
				{
					path: '/admin/sub-category/list',
					element: <SubCategoryList />,
				},
				{
					path: '/admin/sub-category/list/:uid',
					element: <SubCategoryList />,
				},
				{
					path: '/admin/notifications',
					element: <Notifications />,
				},
				{
					path: '/admin/setting',
					element: <AdminSetting />,
				},
				{
					path: '/admin/category/banner/add',
					element: <AddCategoryBanner />
				},
				{
					path: '/admin/category/banner/add/:uid',
					element: <AddCategoryBanner />
				},
				{
					path: '/admin/category/banner/image/update/:uid',
					element: <UpdateCategoryBanner />
				},
				{
					path: '/admin/leads/:uid',
					element: <Leads />
				},
				{
					path: '/admin/user/leads/:uid',
					element: <UserLeads />
				},
				{
					path: '/admin/store/comments/reply/:uid',
					element: <UpdateComment />
				},
				{
					path: '/admin/about',
					element: <AdminAbout />
				},
				{
					path: '/admin/about/team/add',
					element: <AddMember />
				},
				{
					path: '/admin/about/update',
					element: <UpdateAbout />
				}
			],
		},
		{
			path: '/admin/login',
			element: (
				<Suspense fallback={<Loading />}>
					<AdminLogin />
				</Suspense>
			),
		},
	]);

	return (
		<>
			<AdminSidebarContextProvider>
				<RouterProvider router={router} />
			</AdminSidebarContextProvider>
		</>
	);
}

export default App;
