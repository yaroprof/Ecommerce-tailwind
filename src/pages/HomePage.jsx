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

    // Діагностика
    useEffect(() => {
        console.log('HomePage - searchByTitle:', searchByTitle, 'filteredItems:', filteredItems);
    }, [searchByTitle, filteredItems]);

    // Редірект на /not-found, якщо результатів немає
    useEffect(() => {
        if (filteredItems?.length === 0 && searchByTitle?.trim() !== '') {
            navigate('/not-found');
        }
    }, [filteredItems, searchByTitle, navigate]);

    const renderView = () => {
        if (!filteredItems) {
            return <p>Loading...</p>;
        }
        if (filteredItems.length === 0) {
            return <p className="text-center text-gray-500 text-lg">No results found 😣</p>;
        }
        return filteredItems.map((item) => (
            <Card key={item.id} item={item} />
        ));
    };

    return (
        <Layout>
            <h1 style={{ color: 'red' }}>Homepage.jsx</h1>
            <h1 className="mb-6 font-bold text-4xl text-gray-800">Shoper</h1>
            <form className="w-full max-w-lg mb-8">
                <input
                    type="text"
                    placeholder="Search product..."
                    value={searchByTitle || ''} // Керований компонент
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    onChange={(e) => setSearchByTitle(e.target.value)}
                />
                <button
                    type="button"
                    className="mt-2 py-2 px-4 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                    onClick={clearSearch}
                    disabled={!searchByTitle} // Додаткова перевірка
                >
                    Clear Search
                </button>
            </form>
            <div className="grid gap-6 w-full max-w-screen-xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {renderView()}
            </div>
            <ProductDetail />
        </Layout>
    );
};






//v3.0
// import { useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card, Layout, ProductDetail } from '../components';
// import { ProductsContext } from '../context/ProductsContext';
// import { GoToTop } from '../utils';

// export const HomePage = () => {
//     const {
//         filteredItems,
//         searchByTitle,
//         setSearchByTitle,
//         clearSearch,
//     } = useContext(ProductsContext);

//     const navigate = useNavigate();
//     GoToTop();

//     // 👇 Якщо результатів пошуку нема — редірект на /not-found
//     useEffect(() => {
//         if (filteredItems?.length === 0 && searchByTitle.trim() !== '') {
//             navigate('/not-found');
//         }
//     }, [filteredItems, searchByTitle, navigate]);

//     // 👇 Очищуємо пошук при монтуванні сторінки
//     useEffect(() => {
//         if (searchByTitle !== '') {
//             clearSearch();
//         }
//     }, [clearSearch, searchByTitle]);

//     const renderView = () => {
//         if (!filteredItems) {
//             return <p>Loading...</p>; // або компонент Loader
//         }
//         return filteredItems.map((item) => (
//             <Card key={item.id} item={item} />
//         ));
//     };

//     return (
//         <Layout>
//             <h1 style={{ color: 'red' }}>Homepage.jsx</h1>
//             <h1 className="mb-6 font-bold text-4xl text-gray-800">Shoper</h1>
//             <form className="w-full max-w-lg mb-8">
//                 <input
//                     type="text"
//                     placeholder="Search product..."
//                     className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                     onChange={(e) => setSearchByTitle(e.target.value)}
//                 />
//             </form>
//             <div className="grid gap-6 w-full max-w-screen-xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//                 {renderView()}
//             </div>
//             <ProductDetail />
//         </Layout>
//     );
// };



// v2.0
// import { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card, Layout, ProductDetail } from '../components';
// import { Context } from '../context';
// import { GoToTop } from '../utils';

// export const HomePage = () => {
//     const context = useContext(Context);
//     const navigate = useNavigate();
//     GoToTop();

//     // 👇 Якщо результатів пошуку нема — редірект на /not-found
//     useEffect(() => {
//         if (context.filteredItems?.length === 0 && context.searchByTitle.trim() !== '') {
//             navigate('/not-found');
//         }
//     }, [context.filteredItems, context.searchByTitle, navigate]); 

//     useEffect(() => {
//     if (context.searchByTitle !== '') {
//         context.clearSearch();
//     }
// }, []); 

// const renderView = () => {
//     if (!context.filteredItems) {
//         return <p>Loading...</p>; // або спінер
//     }

//     return context.filteredItems.map((item) => (
//         <Card key={item.id} item={item} />
//     ));
// };

//     return (
//         <Layout>
//             <h1 style={{ color: 'red' }}>Homepage.jsx</h1>
//             <h1 className="mb-6 font-bold text-4xl text-gray-800">Shoper</h1>
//             <form className="w-full max-w-lg mb-8">
//                 <input
//                     type="text"
//                     placeholder="Search product..."
//                     className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
//                     onChange={(e) => context.setSearchByTitle(e.target.value)}
//                 />
//             </form>
//             <div className="grid gap-6 w-full max-w-screen-xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//                 {renderView()}
//             </div>
//             <ProductDetail />
//         </Layout>
//     );
// };

