import { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { usePersistedState } from '../hooks/usePersistedState';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = usePersistedState('comprarShopi', []);
    const [order, setOrder] = usePersistedState('checkout', []);

    const value = useMemo(() => ({
        cartProducts,
        setCartProducts,
        order,
        setOrder,
        productsCount: cartProducts.length,
    }), [cartProducts, order]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
