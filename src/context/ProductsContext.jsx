import { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { products as initialProducts } from '../assets/products';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [items, setItems] = useState(initialProducts);
    const [filteredItems, setFilteredItems] = useState(initialProducts);
    const [searchByTitle, setSearchByTitle] = useState('');
    const [searchByCategory, setSearchByCategory] = useState('');

    useEffect(() => {
        // console.log('ProductsContext useEffect - current searchByCategory:', searchByCategory, 'current searchByTitle:', searchByTitle);

        let currentFiltered = [...items];

        if (searchByTitle.trim()) {
            currentFiltered = currentFiltered.filter(item =>
                item.title.toLowerCase().includes(searchByTitle.toLowerCase())
            );
        }
        if (searchByCategory.trim()) {
            currentFiltered = currentFiltered.filter(item =>
                item.category.toLowerCase() === searchByCategory.toLowerCase() // Змінено на === для точного співпадіння категорії
            );
        }
        // console.log('ProductsContext: Items after filtering:', currentFiltered.length, 'items found.');

        setFilteredItems(currentFiltered);
    }, [items, searchByTitle, searchByCategory]);


    const clearSearch = () => {
        // console.log('ProductsContext: clearSearch called.');
        setSearchByTitle('');

        setSearchByCategory(''); 
        setFilteredItems(items);
        // console.log('ProductsContext: Search and Category filters cleared.');
    };

    const value = useMemo(() => ({
        items,
        setItems,
        filteredItems,
        searchByTitle,
        setSearchByTitle,
        searchByCategory,
        setSearchByCategory,
        clearSearch,
    }), [items, filteredItems, searchByTitle, searchByCategory]);

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
};

ProductsProvider.propTypes = {
    children: PropTypes.node.isRequired,
};