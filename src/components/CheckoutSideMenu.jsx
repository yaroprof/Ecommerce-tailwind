
// v3.0

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { CartContext } from '../context/CartContext';
import { OrderCard } from './OrderCard';
import { UIContext } from '../context/UIContext';
import { totalPrice } from '../utils';
import { useCreateDate } from '../hooks';

export const CheckoutSideMenu = () => {
    const { isCheckoutSideMenuOpen, closeCheckoutSideMenu } = useContext(UIContext);
    const { cartProducts, setCartProducts, order, setOrder } = useContext(CartContext);
    const navigate = useNavigate();

    const date = useCreateDate();

    const handleDelete = (id) => {
        const filteredProducts = cartProducts.filter(prod => prod.id !== id);
        setCartProducts(filteredProducts);
    };

    const handleCheckout = () => {
        if (cartProducts.length === 0) return;
        const orderToAdd = {
            id: new Date().getTime(),
            date,
            products: cartProducts,
            totalProducts: cartProducts.length,
            totalPrice: totalPrice(cartProducts),
        };
        setOrder([...order, orderToAdd]);
        setCartProducts([]);
        closeCheckoutSideMenu();
        navigate('/payment');
    };

    return (
        <aside
            className={`${isCheckoutSideMenuOpen ? 'translate-x-0' : 'translate-x-full'
                } fixed right-0 top-0 h-screen w-96 bg-white border-l border-gray-200 shadow-lg transition-transform duration-300 ease-in-out z-50 ${!isCheckoutSideMenuOpen && 'hidden'
                }`}
        >
            <h1 style={{ color: 'red' }}>CheckoutSideMenu.jsx</h1>
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="font-semibold text-xl text-gray-800">My Order</h2>
                <XMarkIcon
                    className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors"
                    onClick={() => closeCheckoutSideMenu()}
                />
            </div>
            <div className="p-4">
                <p className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Total in cart:</span>
                    <span className="font-semibold text-2xl text-red-600">
                        ${totalPrice(cartProducts) || 0}
                    </span>
                </p>
                {cartProducts.length > 0 && (
                    <div className="space-y-3">
                        <button
                            type="button"
                            className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            onClick={handleCheckout}
                        >
                            Proceed to Payment
                        </button>
                        <button
                            type="button"
                            className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            onClick={() => setCartProducts([])}
                        >
                            Delete all items
                        </button>
                    </div>
                )}
            </div>
            <hr className="border-gray-200 my-4" />
            <div className="px-4 overflow-y-auto max-h-[calc(100vh-200px)]">
                {cartProducts.map((prod) => (
                    <OrderCard
                        key={prod.id}
                        id={prod.id}
                        title={prod.title}
                        imageUrl={prod.images[0]}
                        price={prod.price}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>
        </aside>
    );
};





// v.2.0
// import { useContext } from 'react';
// import { useNavigate } from 'react-router-dom'; // Додано для перенаправлення
// import { XMarkIcon } from '@heroicons/react/24/solid';
// import { Context } from '../context';
// import { OrderCard } from './OrderCard';
// import { totalPrice } from '../utils';
// import { useCreateDate } from '../hooks';

// // Оптимізація: видалено непотрібний імпорт styles.css, оскільки використовуємо Tailwind
// export const CheckoutSideMenu = () => {
//     const context = useContext(Context);
//     const navigate = useNavigate(); // Ініціалізація navigate

//     const date = useCreateDate();

//     // Функція для видалення продукту з кошика
//     const handleDelete = (id) => {
//         const filteredProducts = context.cartProducts.filter(prod => prod.id !== id);
//         context.setCartProducts(filteredProducts);
//     };

//     // Функція для обробки покупки з перенаправленням на оплату
//     const handleCheckout = () => {
//         if (context.cartProducts.length === 0) return; // Додано перевірку
//         const orderToAdd = {
//             id: new Date().getTime(),
//             date,
//             products: context.cartProducts,
//             totalProducts: context.cartProducts.length,
//             totalPrice: totalPrice(context.cartProducts),
//         };
//         context.setOrder([...context.order, orderToAdd]);
//         context.setCartProducts([]);
//         context.closeCheckoutSideMenu();
//         navigate('/payment'); // Перенаправлення на сторінку оплати
//     };

//     return (
//         <aside
//             className={`${context.isCheckoutSideMenuOpen ? 'translate-x-0' : 'translate-x-full'
//                 } fixed right-0 top-0 h-screen w-96 bg-white border-l border-gray-200 shadow-lg transition-transform duration-300 ease-in-out z-50 ${!context.isCheckoutSideMenuOpen && 'hidden'
//                 }`}
//         >

//             <h1 style={{ color: 'red' }}>CheckoutSideMenu.jsx</h1>


//             {/* Оновлено заголовок і кнопку закриття з сучасним дизайном */}
//             <div className="flex justify-between items-center p-4 border-b border-gray-200">
//                 <h2 className="font-semibold text-xl text-gray-800">My Order</h2>
//                 <XMarkIcon
//                     className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors"
//                     onClick={() => context.closeCheckoutSideMenu()}
//                 />
//             </div>
//             <div className="p-4">
//                 <p className="flex justify-between items-center mb-4">
//                     <span className="text-gray-600">Total in cart:</span>
//                     <span className="font-semibold text-2xl text-red-600">
//                         ${totalPrice(context.cartProducts) || 0}
//                     </span>
//                 </p>
//                 {context.cartProducts.length > 0 && (
//                     <div className="space-y-3">
//                         <button
//                             type="button"
//                             className="w-full py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
//                             onClick={handleCheckout}
//                         >
//                             Proceed to Payment
//                         </button>
//                         <button
//                             type="button"
//                             className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                             onClick={() => context.setCartProducts([])}
//                         >
//                             Delete all items
//                         </button>
//                     </div>
//                 )}
//             </div>
//             <hr className="border-gray-200 my-4" />
//             <div className="px-4 overflow-y-auto max-h-[calc(100vh-200px)]">
//                 {context.cartProducts.map((prod) => (
//                     <OrderCard
//                         key={prod.id}
//                         id={prod.id}
//                         title={prod.title}
//                         imageUrl={prod.images[0]}
//                         price={prod.price}
//                         handleDelete={handleDelete}
//                     />
//                 ))}
//             </div>
//         </aside>
//     );
// };






// import { Link } from 'react-router-dom';
// import { XMarkIcon } from '@heroicons/react/24/solid';
// import { Context } from '../context';
// import { OrderCard } from './OrderCard';
// import { totalPrice } from '../utils';
// import { useCreateDate } from '../hooks';
// import './styles.css';

// export const CheckoutSideMenu = () => {

//     const context = useContext(Context);
//     //console.log(context.cartProducts);

//     const date = useCreateDate();

//     const handleDelete = (id) => {
//         const filteredProducts = context.cartProducts.filter(prod => prod.id != id);
//         context.setCartProducts(filteredProducts);
//     }

//     const handleCheckout = () => {
//         const orderToAdd = {
//             id: new Date().getTime(),
//             date: date,
//             products: context.cartProducts,
//             totalProducts: context.cartProducts.length,
//             totalPrice: totalPrice(context.cartProducts)
//         }

//         context.setOrder([...context.order, orderToAdd]);
//         context.setCartProducts([]);
//         context.closeCheckoutSideMenu();
//         //context.setSearchByTitle(null);
//     }

//     //console.log(context.cartProducts[0].images[0])

//     return (
//         <aside
//             className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0 border border-black rounded-lg fondo`}>
//             <div className='flex justify-between items-center p-4'>
//                 <h2 className='font-medium text-xl'>My Order</h2>
//                 <div>
//                     <XMarkIcon
//                         className='h-6 w-6 text-black cursor-pointer'
//                         onClick={() => context.closeCheckoutSideMenu()}></XMarkIcon>
//                 </div>
//             </div>
//             <div className='px-4 mb-4'>
//                 <p className='flex flex-row justify-between items-center'>
//                     <span>Total in the shopping cart:</span>
//                     <span className='font-medium text-2xl text-red-800'>${totalPrice(context.cartProducts)}</span>
//                 </p>
//                 {
//                     context.productsCount !== 0 &&
//                     <div>
//                         <Link to='/my-orders/last'>
//                             <button
//                                 type='button'
//                                 className='border-2 p-2 rounded-lg w-full mt-3 bg-orange-200' 
//                                 onClick={() => handleCheckout()}
//                             >
//                                 Buy
//                             </button>
//                         </Link>
//                         <button
//                             type='button'
//                             onClick={() => context.setCartProducts([])}
//                             className='border-2 p-2 rounded-lg w-full bg-red-200 mt-3'
//                         >
//                             Delete all items
//                         </button>
//                     </div>
//                 }
//             </div>
//             <hr className='mb-6' />
//             <div className='overflow-y-scroll'>
//                 {
//                     context.cartProducts.map((prod) => (
//                         <OrderCard
//                             key={prod.id}
//                             id={prod.id}
//                             title={prod.title}
//                             imageUrl={prod.images[0]}
//                             price={prod.price}
//                             handleDelete={handleDelete}
//                         />
//                     ))
//                 }
//             </div>
//         </aside>
//     )
// };