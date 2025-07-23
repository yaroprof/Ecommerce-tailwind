import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { ProductsContext, UIContext, CartContext } from '../context'; 
import { ProductsContext } from '../context/ProductsContext';
import { UIContext } from '../context/UIContext';
import { CartContext } from '../context/CartContext';


import { deliveryDate, today, GoToTop } from '../utils';
import { Layout } from '../components';
import { ChevronLeftIcon, StarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';

export const DetailProduct = () => {
    const { items } = useContext(ProductsContext);
    const { showProductDetail, openCheckoutSideMenu, closeProductDetail } = useContext(UIContext);
    const { cartProducts, setCartProducts } = useContext(CartContext); // Додано для кошика
    const navigate = useNavigate();
    const { id } = useParams();
    GoToTop();

    const [image, setImage] = useState('');

    useEffect(() => {
        const product = items.find(item => item.id === id);
        if (!product) {
            navigate('/404');
        } else {
            setImage(product.images?.[0] || '');
        }
    }, [id, items, navigate]);

    const addProductsToCart = (productData) => {
        if (!productData || !productData.id || !productData.title || !productData.price || !productData.images) {
            console.error('Invalid product data:', productData);
            return;
        }
        const existingProduct = cartProducts.find((item) => item.id === productData.id);
        let updatedCart;
        if (existingProduct) {
            updatedCart = cartProducts.map((item) =>
                item.id === productData.id
                    ? { ...item, quantity: (item.quantity || 1) + 1 }
                    : item
            );
        } else {
            updatedCart = [...cartProducts, { ...productData, quantity: 1 }];
        }
        setCartProducts(updatedCart);
        console.log('Updated cart:', updatedCart);
        openCheckoutSideMenu();
        closeProductDetail();
    };

    const renderStars = (rate = 0) => {
        return Array(5)
            .fill()
            .map((_, index) => (
                <StarIcon
                    key={index}
                    className={`h-5 w-5 ${rate >= index + 1 ? 'text-yellow-400' : 'text-gray-300'}`}
                />
            ));
    };

    // Використовуємо продукт із items замість showProductDetail
    const product = items.find(item => item.id === id) || {};

    return (
        <Layout>
            <div className="w-full max-w-screen-lg mx-auto">
                <button
                    className="flex items-center mb-6 text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => navigate(-1)}
                >
                    <ChevronLeftIcon className="h-4 w-4 mr-1" /> Return
                </button>
                <div className="flex flex-col md:flex-row gap-6 mb-10">
                    <figure className="w-full md:w-4/12">
                        <img
                            className="w-full h-64 object-contain rounded-lg"
                            src={image || ''}
                            alt={`Image ${product.title || 'product'}`}
                        />
                        <div className="flex flex-row justify-between mt-4">
                            {product.images?.slice(0, 3).map((img, index) => (
                                <img
                                    key={index}
                                    className="w-20 h-20 object-contain border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
                                    src={img}
                                    alt={`Thumbnail ${product.title}`}
                                    onClick={() => setImage(img)}
                                />
                            ))}
                        </div>
                    </figure>
                    <div className="w-full md:w-4/12">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title || 'No Title'}</h1>
                        <div className="flex space-x-1 mb-4">{renderStars(product.rate)}</div>
                        <div className="space-y-2 text-gray-600">
                            <p>Brand: <span className="font-semibold">{product.brand || 'N/A'}</span></p>
                            <p>Stock: <span className="font-semibold">{product.quantity || 0}</span></p>
                            <p className="text-sm">{product.category || 'N/A'}</p>
                        </div>
                        <p className="font-bold mt-4 text-right">
                            Price: <span className="text-red-600 text-2xl ml-2">${product.price || 0}</span>
                        </p>
                        <p className="mt-4 text-gray-600">About this article</p>
                        <p className="text-sm text-gray-600">{product.description || 'No description'}</p>
                    </div>
                    <div className="w-full md:w-2/12 p-4 bg-gray-50 rounded-lg shadow-md">
                        <p className="text-2xl font-bold text-red-600">${product.price || 0}</p>
                        <p className="text-green-600 font-semibold">Free shipping!</p>
                        <p className="text-xs text-gray-500">
                            Arrives between{' '}
                            <span className="font-medium">
                                {deliveryDate(today, 'dd/mm/yy', 5)} - {deliveryDate(today, 'dd/mm/yy', 10)}
                            </span>
                        </p>
                        <button
                            type="button"
                            className="flex items-center justify-center w-full mt-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            onClick={() => addProductsToCart(product)}
                        >
                            <ShoppingCartIcon className="h-5 w-5 mr-2" /> Add to Cart
                        </button>
                    </div>
                </div>
                {product.banner && (
                    <figure className="w-full mt-6">
                        <img
                            src={product.banner}
                            alt={`Banner ${product.title || 'product'}`}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                    </figure>
                )}
            </div>
        </Layout>
    );
};

// // v.3.0
// import { useContext, useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { ProductsContext } from '../context/ProductsContext';
// import { UIContext } from '../context/UIContext';
// import { CartContext } from '../context/CartContext';
// import { deliveryDate, today, GoToTop } from '../utils';
// import { Layout } from '../components';
// import { ChevronLeftIcon, StarIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';

// export const DetailProduct = () => {
//     const { items } = useContext(ProductsContext);
//     const { showProductDetail, openCheckoutSideMenu, closeProductDetail } = useContext(UIContext);
//     const navigate = useNavigate();
//     const { id } = useParams();
//     GoToTop();

//     const [image, setImage] = useState(showProductDetail?.images?.[0] || '');

//     useEffect(() => {
//         const product = items.find(item => item.id === id);
//         if (!product) {
//             navigate('/404');
//         } else {
//             setImage(product.images?.[0] || '');
//         }
//     }, [id, items, navigate]);

//     const addProductsToCart = (productData) => {
//         if (!productData || !productData.id) {
//             console.error('Invalid product data:', productData);
//             return;
//         }
//         // Тут потрібно отримати cartProducts і setCartProducts з CartContext
//         // Для цього додайте імпорт CartContext
//         const { cartProducts, setCartProducts } = useContext(CartContext); // Додайте CartContext
//         const existingProduct = cartProducts.find((item) => item.id === productData.id);
//         let updatedCart;
//         if (existingProduct) {
//             updatedCart = cartProducts.map((item) =>
//                 item.id === productData.id
//                     ? { ...item, quantity: (item.quantity || 1) + 1 }
//                     : item
//             );
//         } else {
//             updatedCart = [...cartProducts, { ...productData, quantity: 1 }];
//         }
//         setCartProducts(updatedCart);
//         console.log('Updated cart:', updatedCart);
//         openCheckoutSideMenu();
//         closeProductDetail();
//     };

//     const renderStars = (rate = 0) => {
//         return Array(5)
//             .fill()
//             .map((_, index) => (
//                 <StarIcon
//                     key={index}
//                     className={`h-5 w-5 ${rate >= index + 1 ? 'text-yellow-400' : 'text-gray-300'}`}
//                 />
//             ));
//     };

//     const product = showProductDetail || {};

//     return (
//         <Layout>
//             <div className="w-full max-w-screen-lg mx-auto">
//                 <button
//                     className="flex items-center mb-6 text-gray-600 hover:text-gray-900 transition-colors"
//                     onClick={() => navigate(-1)}
//                 >
//                     <ChevronLeftIcon className="h-4 w-4 mr-1" /> Return
//                 </button>
//                 <div className="flex flex-col md:flex-row gap-6 mb-10">
//                     <figure className="w-full md:w-4/12">
//                         <img
//                             className="w-full h-64 object-contain rounded-lg"
//                             src={image || ''}
//                             alt={`Image ${product.title || 'product'}`}
//                         />
//                         <div className="flex flex-row justify-between mt-4">
//                             {product.images?.slice(0, 3).map((img, index) => (
//                                 <img
//                                     key={index}
//                                     className="w-20 h-20 object-contain border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
//                                     src={img}
//                                     alt={`Thumbnail ${product.title}`}
//                                     onClick={() => setImage(img)}
//                                 />
//                             ))}
//                         </div>
//                     </figure>
//                     <div className="w-full md:w-4/12">
//                         <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title || 'No Title'}</h1>
//                         <div className="flex space-x-1 mb-4">{renderStars(product.rate)}</div>
//                         <div className="space-y-2 text-gray-600">
//                             <p>Brand: <span className="font-semibold">{product.brand || 'N/A'}</span></p>
//                             <p>Stock: <span className="font-semibold">{product.quantity || 0}</span></p>
//                             <p className="text-sm">{product.category || 'N/A'}</p>
//                         </div>
//                         <p className="font-bold mt-4 text-right">
//                             Price: <span className="text-red-600 text-2xl ml-2">${product.price || 0}</span>
//                         </p>
//                         <p className="mt-4 text-gray-600">About this article</p>
//                         <p className="text-sm text-gray-600">{product.description || 'No description'}</p>
//                     </div>
//                     <div className="w-full md:w-2/12 p-4 bg-gray-50 rounded-lg shadow-md">
//                         <p className="text-2xl font-bold text-red-600">${product.price || 0}</p>
//                         <p className="text-green-600 font-semibold">Free shipping!</p>
//                         <p className="text-xs text-gray-500">
//                             Arrives between{' '}
//                             <span className="font-medium">
//                                 {deliveryDate(today, 'dd/mm/yy', 5)} - {deliveryDate(today, 'dd/mm/yy', 10)}
//                             </span>
//                         </p>
//                         <button
//                             type="button"
//                             className="flex items-center justify-center w-full mt-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
//                             onClick={() => addProductsToCart(product)}
//                         >
//                             <ShoppingCartIcon className="h-5 w-5 mr-2" /> Add to Cart
//                         </button>
//                     </div>
//                 </div>
//                 {product.banner && (
//                     <figure className="w-full mt-6">
//                         <img
//                             src={product.banner}
//                             alt={`Banner ${product.title || 'product'}`}
//                             className="w-full h-48 object-cover rounded-lg"
//                         />
//                     </figure>
//                 )}
//             </div>
//         </Layout>
//     );
// };

