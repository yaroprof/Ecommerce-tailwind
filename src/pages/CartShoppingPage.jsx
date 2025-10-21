import { useContext } from 'react';
import { Layout, OrderCard } from '../components';
import { CartContext } from '../context/CartContext'; // Правильний імпорт CartContext
import { UIContext } from '../context/UIContext';     // <-- Додано імпорт UIContext


import { GoToTop } from '../utils';
// import { Context } from '../context';
import { Link } from 'react-router-dom';
import { totalPrice } from '../utils';
import { useCreateDate } from '../hooks';

export const CartShoppingPage = () => {
    const { cartProducts, setCartProducts, order, setOrder } = useContext(CartContext); // Деструктуризуємо з CartContext
    const { closeCheckoutSideMenu } = useContext(UIContext); // <-- Деструктуризуємо closeCheckoutSideMenu з UIContext

    console.log('CartShoppingPage cartProducts:', cartProducts); // Діагностика

    const date = useCreateDate();
    GoToTop();

    const handleDelete = (id) => {
        const filteredProducts = cartProducts.filter(prod => prod.id !== id);
        setCartProducts(filteredProducts);
    };

    const handleCheckout = () => {
        const orderToAdd = {
            id: new Date().getTime(),
            date: date,
            products: cartProducts,
            totalProducts: cartProducts.length,
            totalPrice: totalPrice(cartProducts)
        };

        setOrder([...order, orderToAdd]); // Використовуємо setOrder з CartContext
        setCartProducts([]); // Очищаємо кошик
        closeCheckoutSideMenu(); // <-- Використовуємо функцію з UIContext
    };

    return (
        <Layout>
            <h1 className="mb-6 text-3xl font-bold text-gray-900 tracking-tight">
                My Shopping Cart
            </h1>
            <div style={{ color: 'red' }}>CartShoppingPage.jsx page</div>
            <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
                <div className="flex-1 max-h-[70vh] overflow-y-auto pr-4">
                    {cartProducts.length === 0 ? ( // Використовуємо cartProducts
                        <p className="text-gray-500 text-center py-10">Your cart is empty</p>
                    ) : (
                        cartProducts.map((prod) => ( // Використовуємо cartProducts
                            <OrderCard
                                key={prod.id}
                                id={prod.id}
                                title={prod.title}
                                imageUrl={prod.images[0]}
                                price={prod.price}
                                quantity={prod.quantity}
                                handleDelete={handleDelete}
                            />
                        ))
                    )}
                </div>
                <div className="lg:w-80 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-medium text-gray-700">Total:</span>
                        <span className="text-2xl font-bold text-red-600">
                            ${totalPrice(cartProducts).toFixed(2)} {/* Використовуємо cartProducts */}
                        </span>
                    </div>
                    {cartProducts.length !== 0 && ( // Перевіряємо довжину cartProducts
                        <div className="space-y-3">
                            <Link to="/my-orders/last">
                                <button
                                    type="button"
                                    className="w-full py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg font-medium hover:from-orange-500 hover:to-orange-600 transition-all duration-200 shadow-sm hover:shadow-md"
                                    onClick={() => handleCheckout()}
                                >
                                    Proceed to Checkout
                                </button>
                            </Link>
                            <button
                                type="button"
                                className="w-full py-3 bg-white text-red-600 border border-red-300 rounded-lg font-medium hover:bg-red-50 transition-all duration-200 shadow-sm hover:shadow-md"
                                onClick={() => setCartProducts([])} // Використовуємо setCartProducts
                            >
                                Clear Cart
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};