// v2.0

import { useContext } from 'react';
import { Layout, OrdersCard } from '../components';
import { CartContext } from '../context/CartContext'; // Assuming CartContext is exported from CartContext.js
// import { OrdersCard } from '../components/OrdersCard'; // Assuming OrdersCard is exported from
import { Link } from 'react-router-dom';
import { GoToTop } from '../utils';

export const MyOrders = () => {
    const { order } = useContext(CartContext); // Destructure order from CartContext
    GoToTop();

    // Protection against undefined and removing duplicates in the orders array
    const orders = order ? [...new Map(order.map(item => [item.id, item])).values()] : [];

    return (
        <Layout>
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <h1 style={{ color: 'red' }}>MyOrders.jsx</h1>

                <h1 className="mb-8 text-3xl font-bold text-gray-900 bg-gradient-to-r from-teal-100 to-white p-4 rounded-lg shadow-md">
                    My Orders
                </h1>
                {orders.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-x-auto">
                        {/* Added overflow-x-auto for horizontal scrolling if content overflows */}
                        {orders.map((order, index) => (
                            <Link
                                to={`/my-orders/${index}`}
                                key={order.id || `order-${index}`} // Unique key
                                className="block w-full hover:shadow-lg transition-shadow duration-300"
                            >
                                <OrdersCard
                                    id={order.id}
                                    date={order.date}
                                    totalPrice={order.totalPrice}
                                    totalProducts={order.totalProducts}
                                    className="w-full h-auto min-h-[200px]" // Increased minimum height
                                />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg shadow-md">
                        <p className="text-xl text-gray-500">No orders yet.</p>
                    </div>
                )}
            </div>
        </Layout>
    );
};





// v.1.0
// import { useContext } from 'react';
// import { Layout, OrdersCard } from '../components';
// import { Context } from '../context';
// import { Link } from 'react-router-dom';
// import { GoToTop } from '../utils';

// export const MyOrders = () => {
//     const context = useContext(Context);
//     GoToTop();

//     // Захист від undefined і видалення дублів у масиві замовлень
//     const orders = context.order ? [...new Map(context.order.map(item => [item.id, item])).values()] : [];

//     return (
//         <Layout>
//             <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

//                 <h1 style={{color: 'red'}}>MyOrders.jsx</h1>

//                 <h1 className="mb-8 text-3xl font-bold text-gray-900 bg-gradient-to-r from-teal-100 to-white p-4 rounded-lg shadow-md">
//                     My Orders
//                 </h1>
//                 {orders.length > 0 ? (
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-x-auto">
//                         {/* Додано overflow-x-auto для горизонтального скролінгу, якщо вміст не вміщається */}
//                         {orders.map((order, index) => (
//                             <Link
//                                 to={`/my-orders/${index}`}
//                                 key={order.id || `order-${index}`} // Унікальний ключ
//                                 className="block w-full hover:shadow-lg transition-shadow duration-300"
//                             >
//                                 <OrdersCard
//                                     id={order.id}
//                                     date={order.date}
//                                     totalPrice={order.totalPrice}
//                                     totalProducts={order.totalProducts}
//                                     className="w-full h-auto min-h-[200px]" // Збільшено мінімальну висоту
//                                 />
//                             </Link>
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="text-center py-12 bg-gray-50 rounded-lg shadow-md">
//                         <p className="text-xl text-gray-500">No orders yet.</p>
//                     </div>
//                 )}
//             </div>
//         </Layout>
//     );
// };
