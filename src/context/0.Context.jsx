import { createContext, useEffect, useState, useContext } from 'react';

import PropTypes from 'prop-types';
import { products } from '../assets/products';



export const Context = createContext();


export const ShoppingCartProvider = ({ children }) => {
    // Ініціалізація стану
    const [items, setItems] = useState(products);
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
    const [showProductDetail, setShowProductDetail] = useState({});


    const [cartProducts, setCartProducts] = useState(() => {
        try {
            const saved = localStorage.getItem('comprarShopi');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error parsing localStorage comprarShopi:', error);
            return [];
        }
    });

    const [order, setOrder] = useState(() => {
        const saved = localStorage.getItem('checkout');
        return saved ? JSON.parse(saved) : [];
    });
    const [filteredItems, setFilteredItems] = useState(null);
    const [searchByTitle, setSearchByTitle] = useState(null);
    const [searchByCategory, setSearchByCategory] = useState(null);

    // Методи
    const openProductDetail = () => setIsProductDetailOpen(true);
    const closeProductDetail = () => setIsProductDetailOpen(false);
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);
    const clearSearch = () => {
        setSearchByTitle('');
        setFilteredItems(items);
    };

    // Оновлення localStorage
    useEffect(() => {
        try {
            localStorage.setItem('comprarShopi', JSON.stringify(cartProducts));
            console.log('Saved to localStorage:', localStorage.getItem('comprarShopi')); // Діагностика
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }, [cartProducts]);

    // Фільтрація
    const filteredItemsByTitle = (items, searchByTitle) =>
        items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()));
    const filteredItemsByCategory = (items, searchByCategory) =>
        items?.filter(item => item.category.toLowerCase().includes(searchByCategory.toLowerCase()));

    useEffect(() => {
        if (searchByTitle && searchByCategory) {
            setFilteredItems(
                filteredItemsByCategory(items, searchByCategory).filter(item =>
                    item.title.toLowerCase().includes(searchByTitle.toLowerCase())
                )
            );
        } else if (searchByTitle) {
            setFilteredItems(filteredItemsByTitle(items, searchByTitle));
        } else if (searchByCategory) {
            setFilteredItems(filteredItemsByCategory(items, searchByCategory));
        } else {
            setFilteredItems(items);
        }
    }, [items, searchByTitle, searchByCategory]);

    return (
        <Context.Provider
            value={{
                items,
                setItems,
                openProductDetail,
                closeProductDetail,
                isProductDetailOpen,
                showProductDetail,
                setShowProductDetail,
                cartProducts,
                setCartProducts,
                isCheckoutSideMenuOpen,
                productsCount: cartProducts.length, // Коректно обчислюється
                openCheckoutSideMenu,
                closeCheckoutSideMenu,
                order,
                setOrder,
                filteredItems,
                searchByTitle,
                setSearchByTitle,
                searchByCategory,
                setSearchByCategory,
                clearSearch
            }}
        >
            {children}
        </Context.Provider>
    );
};

ShoppingCartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
