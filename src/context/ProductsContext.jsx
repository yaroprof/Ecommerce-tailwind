// v.3.0
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
        console.log('ProductsProvider useEffect triggered - searchByTitle:', searchByTitle, 'searchByCategory:', searchByCategory);
        let filtered = [...items];
        if (searchByTitle.trim()) {
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(searchByTitle.toLowerCase())
            );
        }
        if (searchByCategory.trim()) {
            filtered = filtered.filter(item =>
                item.category.toLowerCase().includes(searchByCategory.toLowerCase())
            );
        }
        setFilteredItems(filtered);
    }, [items, searchByTitle, searchByCategory]);

    const clearSearch = () => {
        setSearchByTitle('');
        setSearchByCategory('');
        setFilteredItems(items);
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


// v.2.0
// import { createContext, useState, useEffect, useMemo } from 'react';
// import PropTypes from 'prop-types';
// import { products as initialProducts } from '../assets/products';

// export const ProductsContext = createContext();

// export const ProductsProvider = ({ children }) => {
//     const [items, setItems] = useState(initialProducts);
//     const [filteredItems, setFilteredItems] = useState(initialProducts);
//     const [searchByTitle, setSearchByTitle] = useState('');
//     const [searchByCategory, setSearchByCategory] = useState('');

//     useEffect(() => {
//         let filtered = items;
//         if (searchByTitle) {
//             filtered = filtered.filter(item =>
//                 item.title.toLowerCase().includes(searchByTitle.toLowerCase())
//             );
//         }
//         if (searchByCategory) {
//             filtered = filtered.filter(item =>
//                 item.category.toLowerCase().includes(searchByCategory.toLowerCase())
//             );
//         }
//         setFilteredItems(filtered);
//     }, [items, searchByTitle, searchByCategory]);

//     const clearSearch = () => {
//         setSearchByTitle('');
//         setSearchByCategory('');
//         setFilteredItems(items);
//     };

//     const value = useMemo(() => ({
//         items,
//         setItems,
//         filteredItems,
//         searchByTitle,
//         setSearchByTitle,
//         searchByCategory,
//         setSearchByCategory,
//         clearSearch,
//     }), [items, filteredItems, searchByTitle, searchByCategory]);

//     return (
//         <ProductsContext.Provider value={value}>
//             {children}
//         </ProductsContext.Provider>
//     );
// };

// ProductsProvider.propTypes = {
//     children: PropTypes.node.isRequired,
// };
