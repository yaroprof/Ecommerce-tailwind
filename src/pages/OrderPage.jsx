import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Layout, OrderCard } from '../components';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { GoToTop } from '../utils';
import { CartContext } from '../context/CartContext'; // <-- ПРАВИЛЬНИЙ ІМПОРТ

export const OrderPage = () => {
    // Деструктуризуємо 'order' безпосередньо з CartContext
    const { order } = useContext(CartContext);
    GoToTop();

    // Обчислення індексу з URL з захистом від помилок
    const currentPath = window.location.pathname;
    // Отримуємо останній сегмент URL (який має бути індексом)
    // Наприклад, з /my-orders/1, отримаємо "1"
    const indexStr = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    // Перетворюємо на число. Якщо це 'last' або не число, то може бути 0 або інший дефолт.
    // Залежить від того, як ви обробляєте роути.
    // Якщо роут /my-orders/last, то indexStr буде 'last', і parseInt перетворить його на NaN, що стане 0.
    // Якщо ви хочете обробляти 'last' окремо, то логіка має бути складнішою.
    // Наразі припускаємо, що роут завжди буде /my-orders/{index_число}.
    const index = parseInt(indexStr);

    // Отримання замовлення за індексом, з захистом від undefined
    // Перевіряємо, що 'order' є масивом і що 'index' є коректним числом
    const selectedOrder = (order && Array.isArray(order) && !isNaN(index) && index >= 0 && index < order.length)
                          ? order[index]
                          : {}; // Порожній об'єкт, якщо замовлення не знайдено

    // Обчислення загальної суми замовлення
    const total = selectedOrder.products?.reduce((sum, prod) => sum + (prod.price || 0), 0) || 0;

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
                    {selectedOrder.products?.length > 0 ? ( // Використовуємо selectedOrder
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {selectedOrder.products.map((prod) => ( // Використовуємо selectedOrder
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