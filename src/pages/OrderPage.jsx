// v.2.0
import { useContext } from 'react';
// import { Context } from '../context';
import { Link } from 'react-router-dom';
import { Layout, OrderCard } from '../components';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { GoToTop } from '../utils';

export const OrderPage = () => {
    const context = useContext(Context);
    GoToTop();

    // Обчислення індексу з URL з захистом від помилок
    const currentPath = window.location.pathname;
    const index = parseInt(currentPath.substring(currentPath.lastIndexOf('/') + 1)) || 0;
    const order = context.order?.[index] || {};

    // Обчислення загальної суми замовлення
    const total = order.products?.reduce((sum, prod) => sum + (prod.price || 0), 0) || 0;

    return (
        <Layout>
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

            <h1 style={{color: 'red'}}>OrderPage.jsx </h1>


                {/* Сучасний заголовок із градієнтом і анімацією */}
                <div className="flex justify-between items-center mb-8 relative bg-gradient-to-r from-blue-100 to-white p-4 rounded-xl shadow-md">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-wide">Order Details</h1>
                    <Link
                        to="/my-orders"
                        className="text-gray-600 hover:text-blue-600 transition-all duration-200"
                    >
                        <ChevronRightIcon className="h-6 w-6 transform hover:scale-110" />
                    </Link>
                </div>
                <div className="w-full">
                    {order.products?.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {order.products.map((prod) => (
                                    <OrderCard
                                        key={prod.id}
                                        id={prod.id}
                                        title={prod.title}
                                        imageUrl={prod.images?.[0]}
                                        price={prod.price}
                                        className="hover:shadow-lg transition-shadow duration-300"
                                    />
                                ))}
                            </div>
                            {/* Стильний блок із загальною сумою */}
                            <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg border border-green-100">
                                <p className="text-right text-lg font-semibold text-gray-800">
                                    Total : <span className="text-green-700">${total.toFixed(2)}</span>
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl shadow-md">
                            <p className="text-xl text-gray-500">No products in this order.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};








// v.1.0


// import { useContext } from 'react';
// import { Context } from '../context';
// import { Link } from 'react-router-dom';
// import { Layout, OrderCard } from '../components';
// import { ChevronRightIcon } from '@heroicons/react/24/solid';
// import { GoToTop } from '../utils';

// export const OrderPage = () => {
//     const context = useContext(Context);
//     GoToTop();

//     // Обчислення індексу з URL з захистом від помилок
//     const currentPath = window.location.pathname;
//     const index = parseInt(currentPath.substring(currentPath.lastIndexOf('/') + 1)) || 0;
//     const order = context.order?.[index] || {};

//     // Функція для обчислення загальної суми замовлення
//     const total = order.products?.reduce((sum, prod) => sum + (prod.price || 0), 0) || 0;

//     return (
//         <Layout>
//             <div className="w-full max-w-2xl mx-auto">
//                 {/* Оновлено заголовок з адаптивним вирівнюванням */}
//                 <div className="flex justify-between items-center mb-6 relative">
//                     <h1 className="font-bold text-2xl text-gray-800">Order</h1>
//                     <Link to="/my-orders" className="text-gray-600 hover:text-gray-900">
//                         <ChevronRightIcon className="h-5 w-5" />
//                     </Link>
//                 </div>
//                 <div className="w-full">
//                     {order.products?.length > 0 ? (
//                         <>
//                             {order.products.map((prod) => (
//                                 <OrderCard
//                                     key={prod.id}
//                                     id={prod.id}
//                                     title={prod.title}
//                                     imageUrl={prod.images?.[0]}
//                                     price={prod.price}
//                                 />
//                             ))}
//                             {/* Додано відображення загальної суми */}
//                             <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-md">
//                                 <p className="text-right font-semibold text-gray-700">
//                                     Total: <span className="text-red-600">${total}</span>
//                                 </p>
//                             </div>
//                         </>
//                     ) : (
//                         <p className="text-center text-gray-500">No products in this order.</p>
//                     )}
//                 </div>
//             </div>
//         </Layout>
//     );
// };





// v.0.0
// import { useContext } from 'react';
// import { Context } from '../context';
// import { Link } from 'react-router-dom';
// import { Layout, OrderCard } from '../components';
// import { ChevronRightIcon } from '@heroicons/react/24/solid';
// import { GoToTop } from '../utils';

// export const OrderPage = () => {
//     const context = useContext(Context);
//     GoToTop();

//     const currentPath = window.location.pathname;
//     let index = currentPath.substring(currentPath.lastIndexOf('/') + 1);

//     return (
//             <Layout>
//                 <div className='flex justify-center items-center font-light w-1/2 relative'>
//                     <h1 className='mb-5 font-bold text-2xl'>Order</h1>
//                     <Link to='/my-orders' className='absolute right-0'>
//                         <ChevronRightIcon className='h-4 w-4 text-black'></ChevronRightIcon>
//                     </Link>
//                 </div>
//                 <div className='w-1/2 mt-10'>
//                 {
//                     context.order?.[index]?.products.map((prod) => (
//                             <OrderCard
//                                 key={prod.id}
//                                 id={prod.id}
//                                 title={prod.title}
//                                 imageUrl={prod.images?.[0]}
//                                 price={prod.price}
//                             />
//                         ))
//                     }
//                 </div>
//             </Layout>
//     )

// };