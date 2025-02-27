import ContentAreaProps from '../interfaces/ContentAreaProps';
import MerchentManagement from './contents/MerchentManagement';
import ProductManagement from './contents/ProductManagement';
import Products from './contents/Products';
import Settings from './contents/Settings';
import UserManagement from './contents/UserManagement';

function ContentArea({ currentPath }: ContentAreaProps) {
  const content:any = {
    '/users': <UserManagement />,
    '/merchants': <MerchentManagement />,
    '/products':<Products/>,
    '/settings': <Settings />,
    '/product-management': <ProductManagement />,
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100">
      {content[currentPath] || <div>404 - Page not found</div>}
    </div>
  );
}

export default ContentArea;
