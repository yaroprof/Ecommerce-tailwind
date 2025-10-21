import { useRoutes, BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext'; // Заміна на CartProvider
import { ProductsProvider } from '../../context/ProductsContext'; // Заміна на ProductsProvider
import { UIProvider } from '../../context/UIContext'; // Заміна на UIProvider


// import { ShoppingCartProvider } from '../../context';
import { HomePage, NotFound, MyOrders, DetailProduct, CartShoppingPage, OrderPage, LastOrderPage, PaymentPage } from '../';
import { NavBar, Footer, CheckoutSideMenu } from '../../components';
import './App.css';

const AppRoutes = () => {
    let routes = useRoutes([
        { path: '/', element: <HomePage /> },
        { path: '/laptops', element: <HomePage /> },
        { path: '/tablets', element: <HomePage /> },
        { path: '/cameras', element: <HomePage /> },
        { path: '/headphones', element: <HomePage /> },
        { path: '/cellphones', element: <HomePage /> },
        { path: '/accessories', element: <HomePage /> },
        // { path: '/account', element: <Account /> },
        { path: '/cart-shopping', element: <CartShoppingPage /> },
        { path: '/my-orders/last', element: <LastOrderPage /> },
        { path: '/my-orders/:id', element: <OrderPage /> },
        { path: '/my-orders', element: <MyOrders /> },
        { path: '/payment', element: <PaymentPage /> }, // Додано маршрут для PaymentPage

        // { path: '/sign-in', element: <Signin /> },
        { path: '/*', element: <NotFound /> }, // 👈 catch-all в кінці

        { path: '/product/:id', element: <DetailProduct /> },

    ]);

    return routes;
}

export const App = () => {
    return (
        <CartProvider>
            <ProductsProvider>
                <UIProvider>
                    <BrowserRouter>
                        <AppRoutes />
                        <NavBar />
                        <Footer />
                        <CheckoutSideMenu />
                    </BrowserRouter>

                </UIProvider>
            </ProductsProvider>
        </CartProvider>




    )
};


