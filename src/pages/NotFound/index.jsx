// v.2.0
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ProductsContext } from '../../context/ProductsContext'; // Assuming ProductsContext is exported from ProductsContext.js
import { Layout } from '../../components';

export const NotFound = () => {
    const navigate = useNavigate(); 
    const { clearSearch } = useContext(ProductsContext); // Destructure clearSearch from ProductsContext

    const goHome = () => {
        clearSearch();
        navigate('/');
    };

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
                <p className="text-xl text-gray-700 mb-6">Oops! Page not found 😢</p>
                <button
                    onClick={goHome}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                    Return to Home
                </button>
            </div>
        </Layout>
    );
};




// v1.0
// import { useNavigate} from 'react-router-dom';
// import { useContext } from 'react';
// import { Context } from '../../context';
// import { Layout } from '../../components';


// export const NotFound = () => {
//     const navigate = useNavigate(); 
//     const context = useContext(Context);

//     const goHome = () => {
//         context.clearSearch();
//         navigate('/');
//     };

//     return (
//         <Layout>
//             <div className="flex flex-col items-center justify-center h-screen">
//                 <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
//                 <p className="text-xl text-gray-700 mb-6">Oops! Page not found 😢</p>
//                 <button
//                     onClick={goHome}
//                     className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
//                 >
//                     Return to Home
//                 </button>
//             </div>
//         </Layout>
//     );
// };
