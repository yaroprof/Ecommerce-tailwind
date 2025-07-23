import { useContext } from 'react';
import { Layout } from '../components';
import { CartContext } from '../context/CartContext'; // Імпортуємо CartContext

export const PaymentPage = () => {
    const { order } = useContext(CartContext); // Отримуємо order з CartContext

    // Перевірка, чи є останнє замовлення
    const lastOrder = order.length > 0 ? order[order.length - 1] : null;

    return (
        <Layout>
            <div className="max-w-2xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment</h1>
                {lastOrder ? (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Details</h2>
                        <p><strong>Order ID:</strong> {lastOrder.id}</p>
                        <p><strong>Date:</strong> {lastOrder.date}</p>
                        <p><strong>Total Products:</strong> {lastOrder.totalProducts}</p>
                        <p><strong>Total Price:</strong> ${lastOrder.totalPrice.toFixed(2)}</p>
                        <div className="mt-4">
                            <h3 className="text-lg font-medium text-gray-600">Products:</h3>
                            <ul>
                                {lastOrder.products.map((prod, index) => (
                                    <li key={index}>
                                        {prod.title} - ${prod.price} x {prod.quantity || 1}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button
                            className="mt-6 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                            onClick={() => alert('Payment successful!')} // Приклад дії
                        >
                            Confirm Payment
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-500">No orders to display.</p>
                )}
            </div>
        </Layout>
    );
};



// import { useContext } from 'react';
// import { Context } from '../context';
// import { Layout } from '../components/Layout';

// export const PaymentPage = () => {
//     const context = useContext(Context);

//     const total = context.order?.slice(-1)[0]?.totalPrice || 0;

//     return (
//         <Layout>
//             <div className="w-full max-w-2xl mx-auto px-4 py-6">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-6">Payment</h1>
//                 <div className="bg-white p-6 rounded-lg shadow-md">
//                     <p className="text-lg">Total to pay: <span className="font-bold text-green-600">${total.toFixed(2)}</span></p>
//                     <button className="mt-4 w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
//                         Pay Now
//                     </button>
//                     {/* Тут можна інтегрувати реальну платіжну систему (Stripe, PayPal тощо) */}
//                 </div>
//             </div>
//         </Layout>
//     );
// };