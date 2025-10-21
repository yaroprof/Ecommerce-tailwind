import { useContext } from 'react';
import { Layout, OrderCard } from '../components';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { GoToTop } from '../utils';
import { CartContext } from '../context/CartContext'; // <-- ПРАВИЛЬНИЙ ІМПОРТ

export const LastOrderPage = () => {
    // Використовуємо CartContext
    const { order } = useContext(CartContext); // <-- Деструктуризуємо 'order' безпосередньо з CartContext
    GoToTop();

    // Отримуємо останнє замовлення з захистом від помилок
    // Перевіряємо, що 'order' існує і є масивом
    const lastOrder = order && Array.isArray(order) && order.length > 0
                      ? order[order.length - 1] // Беремо останній елемент масиву 'order'
                      : {}; // Якщо 'order' порожній або не визначений, повертаємо порожній об'єкт

    const total = lastOrder.products?.reduce((sum, prod) => sum + (prod.price || 0), 0) || 0;

    return (
        <Layout>
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                <h1 style={{ color: 'red' }}>LastOrderPage.jsx</h1>

                {/* Сучасний заголовок із градієнтом і анімацією */}
                <div className="flex justify-between items-center mb-8 bg-gradient-to-r from-purple-100 to-white p-4 rounded-xl shadow-md">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-wide">Last Order</h1>
                    <Link
                        to="/my-orders"
                        className="text-gray-600 hover:text-purple-600 transition-all duration-200"
                    >
                        <ChevronRightIcon className="h-6 w-6 transform hover:scale-110" />
                    </Link>
                </div>
                <div className="w-full">
                    {lastOrder.products?.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                                {lastOrder.products.map((prod) => (
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
                            {/* Стильний блок із деталями замовлення */}
                            <div className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-lg border border-indigo-100">
                                <p className="text-sm text-gray-600">
                                    Date: <span className="font-medium">{lastOrder.date || 'N/A'}</span>
                                </p>
                                <p className="text-right text-lg font-semibold text-gray-800 mt-2">
                                    Total: <span className="text-indigo-700">${total.toFixed(2)}</span>
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-xl shadow-md">
                            <p className="text-xl text-gray-500">No last order available.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};