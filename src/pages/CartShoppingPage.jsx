import { useContext } from 'react';
import { Layout, OrderCard } from '../components';
import { GoToTop } from '../utils';
// import { Context } from '../context';
import { Link } from 'react-router-dom';
import { totalPrice } from '../utils';
import { useCreateDate } from '../hooks';

export const CartShoppingPage = () => {
    const context = useContext(Context);
    console.log('CartShoppingPage cartProducts:', context.cartProducts); // Діагностика

    const date = useCreateDate();
    GoToTop();

    const handleDelete = (id) => {
        const filteredProducts = context.cartProducts.filter(prod => prod.id !== id);
        context.setCartProducts(filteredProducts);
    };

    const handleCheckout = () => {
        const orderToAdd = {
            id: new Date().getTime(),
            date: date,
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts)
        };

        context.setOrder([...context.order, orderToAdd]);
        context.setCartProducts([]);
        context.closeCheckoutSideMenu();
    };

    return (
        <Layout>
            <h1 className="mb-6 text-3xl font-bold text-gray-900 tracking-tight">
                My Shopping Cart
            </h1>
            <div style={{ color: 'red' }}>CartShoppingPage.jsx page</div>
            <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
                <div className="flex-1 max-h-[70vh] overflow-y-auto pr-4">
                    {context.cartProducts.length === 0 ? (
                        <p className="text-gray-500 text-center py-10">Your cart is empty</p>
                    ) : (
                        context.cartProducts.map((prod) => (
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
                            ${totalPrice(context.cartProducts).toFixed(2)}
                        </span>
                    </div>
                    {context.productsCount !== 0 && (
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
                                onClick={() => context.setCartProducts([])}
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