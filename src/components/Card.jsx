// v2.0
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { UIContext } from '../context/UIContext';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid';

export const Card = ({ item }) => {
    const { cartProducts, setCartProducts } = useContext(CartContext);
    const {
        openProductDetail,
        closeCheckoutSideMenu,
        setShowProductDetail,
        openCheckoutSideMenu,
        closeProductDetail,
    } = useContext(UIContext);

    const { id, title, price, category, images } = item;

    if (!id || !title || !price || !images || !images[0]) {
        console.error('Invalid item data:', item);
        return null;
    }

    const showProduct = (productDetail) => {
        closeCheckoutSideMenu();
        openProductDetail();
        setShowProductDetail(productDetail);
    };

    const addProductsToCart = (productData) => {
        if (!productData || !productData.id) {
            console.error('Invalid product data:', productData);
            return;
        }

        const existingProduct = cartProducts.find((prod) => prod.id === productData.id);
        let updatedCart;

        if (existingProduct) {
            updatedCart = cartProducts.map((prod) =>
                prod.id === productData.id
                    ? { ...prod, quantity: (prod.quantity || 1) + 1 }
                    : prod
            );
        } else {
            updatedCart = [...cartProducts, { ...productData, quantity: 1 }];
        }

        setCartProducts(updatedCart);
        closeProductDetail();
        openCheckoutSideMenu();
    };

    const renderIcon = (id) => {
        const isInCart = cartProducts.some((prod) => prod.id === id);
        return isInCart ? (
            <div className="absolute top-2 right-2 flex justify-center items-center bg-green-100 w-6 h-6 rounded-full p-1">
                <CheckIcon className="h-5 w-5 text-black" />
            </div>
        ) : (
            <div
                className="absolute top-2 right-2 flex justify-center items-center bg-white w-6 h-6 rounded-full p-1 border border-gray-300 hover:bg-gray-100 cursor-pointer"
                onClick={() => addProductsToCart(item)}
            >
                <PlusIcon className="h-5 w-5 text-black" />
            </div>
        );
    };

    return (
        <div className="cursor-pointer w-full max-w-xs h-auto rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <figure
                className="relative w-full h-48 overflow-hidden rounded-t-xl"
                onClick={() => showProduct(item)}
            >
                <span className="absolute bottom-2 left-2 bg-white/70 text-black text-xs px-2 py-1 rounded-full flex items-center">
                    {category}
                </span>
                <img
                    src={images[0]}
                    alt={`image ${title}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </figure>
            <div className="p-4">
                <p className="flex justify-between items-center">
                    <span className="text-sm font-light text-gray-700 line-clamp-1">
                        {title.length > 25 ? `${title.substring(0, 24)}...` : title}
                    </span>
                    <span className="text-lg font-medium text-gray-900">${price}</span>
                </p>
            </div>
            {renderIcon(id)}
        </div>
    );
};

Card.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};








// v1.0
// import PropTypes from 'prop-types';
// import { useContext } from 'react';
// import { Context } from '../context';
// import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid';

// export const Card = ({ item }) => {
//     const context = useContext(Context);
//     const { id, title, price, category, images } = item;

//     console.log('Card item:', item); // Діагностика

//     if (!id || !title || !price || !images || !images[0]) {
//         console.error('Invalid item data:', item);
//         return null;
//     }

//     const showProduct = (productDetail) => {
//         context.closeCheckoutSideMenu();
//         context.openProductDetail();
//         context.setShowProductDetail(productDetail);
//     };

//     const addProductsToCart = (productData) => {
//         if (!productData || !productData.id) {
//             console.error('Invalid product data:', productData);
//             return;
//         }
//         const existingProduct = context.cartProducts.find((item) => item.id === productData.id);
//         let updatedCart;
//         if (existingProduct) {
//             updatedCart = context.cartProducts.map((item) =>
//                 item.id === productData.id
//                     ? { ...item, quantity: (item.quantity || 1) + 1 }
//                     : item
//             );
//         } else {
//             updatedCart = [...context.cartProducts, { ...productData, quantity: 1 }];
//         }
//         context.setCartProducts(updatedCart);
//         console.log('Added to cart:', productData);
//         console.log('Updated cart:', updatedCart);
//         context.closeProductDetail();
//         context.openCheckoutSideMenu();
//     };

//     const renderIcon = (id) => {
//         const isInCart = context.cartProducts.some((prod) => prod.id === id);
//         if (isInCart) {
//             return (
//                 <div className="absolute top-2 right-2 flex justify-center items-center bg-green-100 w-6 h-6 rounded-full p-1">
//                     <CheckIcon className="h-5 w-5 text-black" />
//                 </div>
//             );
//         } else {
//             return (
//                 <div
//                     className="absolute top-2 right-2 flex justify-center items-center bg-white w-6 h-6 rounded-full p-1 border border-gray-300 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => addProductsToCart(item)}
//                 >
//                     <PlusIcon className="h-5 w-5 text-black" />
//                 </div>
//             );
//         }
//     };

//     return (
//         <div className="cursor-pointer w-full max-w-xs h-auto rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
//             <h1 style={{ color: 'red' }}>Card.jsx</h1>
//             <figure
//                 className="relative w-full h-48 overflow-hidden rounded-t-xl"
//                 onClick={() => showProduct(item)}
//             >
//                 <span className="absolute bottom-2 left-2 bg-white/70 text-black text-xs px-2 py-1 rounded-full flex items-center">
//                     {category}
//                 </span>
//                 <img
//                     src={images[0]}
//                     alt={`image ${title}`}
//                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
//                 />
//             </figure>
//             <div className="p-4">
//                 <p className="flex justify-between items-center">
//                     <span className="text-sm font-light text-gray-700 line-clamp-1">
//                         {title.length > 25 ? `${title.substring(0, 24)}...` : title}
//                     </span>
//                     <span className="text-lg font-medium text-gray-900">${price}</span>
//                 </p>
//             </div>
//             {renderIcon(id)}
//         </div>
//     );
// };

// Card.propTypes = {
//     item: PropTypes.shape({
//         id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
//         title: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         category: PropTypes.string.isRequired,
//         images: PropTypes.arrayOf(PropTypes.string).isRequired,
//     }).isRequired,
// };