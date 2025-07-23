// v3.0

import { StarIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import { UIContext } from '../context/UIContext';
import { useNavigate } from 'react-router-dom';

export const ProductDetail = () => {
    const {
        showProductDetail,
        isProductDetailOpen,
        closeProductDetail,
    } = useContext(UIContext);
    const navigate = useNavigate();

    const product = showProductDetail || {};
    const isOpen = isProductDetailOpen || false;

    const renderStars = () => {
        const rate = product.rate || 0;
        return Array(5).fill().map((_, index) => (
            <StarIcon
                key={index}
                className={`h-5 w-5 ${rate >= index + 1 ? 'text-yellow-400' : 'text-gray-300'}`}
            />
        ));
    };

    const handleSeeMoreDetails = () => {
        if (product.id) {
            closeProductDetail();
            navigate(`/product/${product.id}`);
        } else {
            console.error('No product ID available!');
        }
    };

    return (
        <aside
            className={`${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            } fixed right-0 top-0 h-screen w-96 bg-white border-l border-gray-200 shadow-lg transition-transform duration-300 ease-in-out z-50`}
        >
            <h1 style={{ color: 'red' }}>ProductDetail.jsx</h1>
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <div>
                    <h2 className="font-semibold text-xl text-gray-800">{product.title || 'No Title'}</h2>
                    <span className="text-xs text-gray-500">{product.category || 'No Category'}</span>
                </div>
                <XMarkIcon
                    onClick={closeProductDetail}
                    className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors"
                />
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-1">{renderStars()}</div>
                    <p className="text-right">
                        Price: <span className="font-bold text-xl text-red-600">${product.price || 0}</span>
                    </p>
                </div>
                <figure className="flex justify-center mb-4">
                    <img
                        src={product.images?.[0] || ''}
                        alt={`image ${product.title || 'product'}`}
                        className="h-48 w-full object-contain rounded-lg"
                    />
                </figure>
                <p className="text-sm text-gray-600 leading-relaxed">
                    {product.description?.length > 200
                        ? `${product.description.substring(0, 200)}...`
                        : product.description || 'No description'}
                </p>
                <button
                    onClick={handleSeeMoreDetails}
                    disabled={!product.id}
                    className={`w-full mt-6 py-2 rounded-lg transition-colors ${
                        product.id
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    See more details
                </button>
            </div>
        </aside>
    );
};









// v2.0
// import { StarIcon, XMarkIcon } from '@heroicons/react/24/solid';
// import { useContext } from 'react';
// import { Context } from '../context';
// // import { Layout } from '../components/Layout.jsx';
// import { useNavigate } from 'react-router-dom';

// export const ProductDetail = () => {
//     const context = useContext(Context);
//     const navigate = useNavigate();
//     const product = context.showProductDetail || {};
//     const isOpen = context.isProductDetailOpen || false;

//     const renderStars = () => {
//         const rate = product.rate || 0;
//         return Array(5).fill().map((_, index) => (
//             <StarIcon
//                 key={index}
//                 className={`h-5 w-5 ${rate >= index + 1 ? 'text-yellow-400' : 'text-gray-300'}`}
//             />
//         ));
//     };

//     const handleSeeMoreDetails = () => {
//         if (product.id) {
//             context.closeProductDetail();
//             navigate(`/product/${product.id}`);
//         } else {
//             console.error('No product ID available!');
//         }
//     };

//     return (
//         <aside
//             className={`${
//                 isOpen ? 'translate-x-0' : 'translate-x-full'
//             } fixed right-0 top-0 h-screen w-96 bg-white border-l border-gray-200 shadow-lg transition-transform duration-300 ease-in-out z-50`}
//         >
//             <h1 style={{color: 'red'}}>ProductDetail.jsx</h1>
//             <div className="flex justify-between items-center p-4 border-b border-gray-200">
//                 <div>
//                     <h2 className="font-semibold text-xl text-gray-800">{product.title || 'No Title'}</h2>
//                     <span className="text-xs text-gray-500">{product.category || 'No Category'}</span>
//                 </div>
//                 <XMarkIcon
//                     onClick={() => context.closeProductDetail()}
//                     className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors"
//                 />
//             </div>
//             <div className="p-4">
//                 <div className="flex justify-between items-center mb-4">
//                     <div className="flex space-x-1">{renderStars()}</div>
//                     <p className="text-right">
//                         Price: <span className="font-bold text-xl text-red-600">${product.price || 0}</span>
//                     </p>
//                 </div>
//                 <figure className="flex justify-center mb-4">
//                     <img
//                         src={product.images?.[0] || ''}
//                         alt={`image ${product.title || 'product'}`}
//                         className="h-48 w-full object-contain rounded-lg"
//                     />
//                 </figure>
//                 <p className="text-sm text-gray-600 leading-relaxed">
//                     {product.description?.length > 200
//                         ? `${product.description.substring(0, 200)}...`
//                         : product.description || 'No description'}
//                 </p>
//                 <button
//                     onClick={handleSeeMoreDetails}
//                     disabled={!product.id}
//                     className={`w-full mt-6 py-2 rounded-lg transition-colors ${
//                         product.id
//                             ? 'bg-blue-500 text-white hover:bg-blue-600'
//                             : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                     }`}
//                 >
//                     See more details
//                 </button>
//             </div>
//         </aside>
//     );
// };



