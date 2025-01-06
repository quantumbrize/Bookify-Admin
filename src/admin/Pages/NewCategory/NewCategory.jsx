import React, { useContext } from 'react';
import SectionMenuLeft from '../../components/SectionMenuLeft/SectionMenuLeft';
import CategoryForm from './CategoryForm';
import { AdminSidebarContext } from '../../../context/adminSidebarContext';

function NewCategory() {
	const { isSidebar } = useContext(AdminSidebarContext);

	return (
		<div className="body">
			<div id="wrapper">
				<div id="page">
					<div className="layout-wrap">
						<SectionMenuLeft />
						<div className="section-content-right">
							<div className="main-content" style={{ paddingLeft: isSidebar ? '280px' : '0px' }}>
								<div className="main-content-inner">
									<div className="main-content-wrap">
										<div className="flex items-center flex-wrap justify-between gap20 mb-27">
											<h3>Add New Category</h3>
										</div>
										<CategoryForm />
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

export default NewCategory;
