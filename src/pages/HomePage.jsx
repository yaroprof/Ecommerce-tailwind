

import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Layout, ProductDetail } from '../components';
import { ProductsContext } from '../context/ProductsContext';
import { GoToTop } from '../utils';

export const HomePage = () => {
    const {
        filteredItems,
        searchByTitle,
        setSearchByTitle,
        clearSearch,
    } = useContext(ProductsContext);

    const navigate = useNavigate();
    GoToTop();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (filteredItems?.length === 0 && searchByTitle.trim() !== '') {
                navigate('/not-found');
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [filteredItems, searchByTitle, navigate]);

    const renderView = () => {
        if (!filteredItems) {
            return <p className="text-center text-lg text-gray-500 animate-pulse mt-10">Loading products...</p>;
        }
        if (filteredItems.length === 0) {
            return (
                <div className="col-span-full flex flex-col items-center justify-center py-20">
                    <p className="text-center text-2xl text-gray-400 font-medium mb-4">No results found 😔</p>
                    <p className="text-center text-base text-gray-500">Try a different search term or clear the filters.</p>
                </div>
            );
        }
        return filteredItems.map((item) => (
            <Card key={item.id} item={item} />
        ));
    };

    return (
        <Layout>
            {/* Заголовок - мінімалістичний з акцентом */}
            <h1 className="mb-10 text-4xl font-bold text-gray-900 tracking-tight hover:text-blue-600 transition-colors duration-200">
                Shoper
            </h1>

            {/* Форма пошуку - сучасний дизайн */}
            {/* <form className="w-full max-w-2xl mb-12 flex flex-col sm:flex-row gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100 animate-fade-in">
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchByTitle}
                    className="flex-grow p-4 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base"
                    onChange={(e) => setSearchByTitle(e.target.value)}
                />
                <button
                    type="button"
                    className="py-3 px-6 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    onClick={clearSearch}
                    disabled={!searchByTitle}
                >
                    Clear Search
                </button>
            </form> */}

            {/* Сітка товарів - з модерновим відступом і центровкою */}
            <div className="grid justify-items-center gap-6 w-full max-w-screen-xl mx-auto grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 animate-fade-in-up">
                {renderView()}
            </div>

            <ProductDetail />
        </Layout>
    );
};


