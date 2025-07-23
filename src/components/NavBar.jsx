// v3.0
import { NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
// import { CartContext } from '../context'; 
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const activeStyle = "underline underline-offset-4 text-blue-600 font-medium";

export const NavBar = () => {
    const { productsCount } = useContext(CartContext); // Оновлено до CartContext
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="flex justify-between items-center fixed top-0 w-full bg-white shadow-md z-10 py-4 px-6 md:px-10 transition-all duration-300">
            <div className="flex items-center">
                <button
                    className="md:hidden text-gray-800 hover:text-blue-600 p-2"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </button>
                <ul className="flex items-center gap-6">
                    <li className="font-bold text-xl text-gray-800">
                        <NavLink to="/" onClick={() => { toggleMenu(); }} className="hover:text-blue-600 transition-colors">Shopi</NavLink>
                    </li>
                </ul>
            </div>

            <ul
                className={`${isMenuOpen ? 'flex flex-col' : 'hidden'
                    } md:flex md:flex-row items-center gap-4 md:gap-6 absolute md:static top-16 left-0 w-full bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 transition-all duration-300 ease-in-out transform ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                    }`}
            >
                <li className="w-full md:w-auto">
                    <NavLink
                        to="/"
                        onClick={() => { toggleMenu(); }}
                        className={({ isActive }) => isActive ? activeStyle : "text-gray-600 hover:text-blue-600 transition-colors block w-full md:inline-block"}
                    >
                        All
                    </NavLink>
                </li>
                <li className="w-full md:w-auto">
                    <NavLink
                        to="/laptops"
                        onClick={() => { toggleMenu(); }}
                        className={({ isActive }) => isActive ? activeStyle : "text-gray-600 hover:text-blue-600 transition-colors block w-full md:inline-block"}
                    >
                        Laptops
                    </NavLink>
                </li>
                {/* ... решта пунктів меню ... */}
            </ul>

            <ul className="flex items-center gap-6">
                <li className="text-gray-500">
                    silvi@platzi.com
                </li>
                <li>
                    <NavLink to="/my-orders" className={({ isActive }) => isActive ? activeStyle : "text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap"}>My orders</NavLink>
                </li>
                <li className="flex items-center gap-2">
                    <NavLink to="/cart-shopping" className={({ isActive }) => isActive ? activeStyle : "text-gray-600 hover:text-blue-600 transition-colors"}>
                        <ShoppingCartIcon className="h-6 w-6 text-gray-800 hover:text-blue-600 transition-colors" />
                    </NavLink>
                    {productsCount === 0 ? (
                        <div className="text-gray-500 text-sm">{productsCount}</div>
                    ) : (
                        <div className="flex justify-center items-center bg-blue-100 text-blue-600 w-6 h-6 rounded-full text-sm font-medium">{productsCount}</div>
                    )}
                </li>
            </ul>
        </nav>
    );
};












//v2.0
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useContext, useState } from 'react';
// import { Context } from '../context';
// import { ShoppingCartIcon } from '@heroicons/react/24/solid';
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

// const activeStyle = "underline underline-offset-4 text-blue-600 font-medium";

// export const NavBar = () => {
//     const context = useContext(Context);
//     const navigate = useNavigate();

//     const [isMenuOpen, setIsMenuOpen] = useState(false);

//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen);
//     };

//     const closeMenu = () => {
//         if (isMenuOpen) setIsMenuOpen(false);
//     };

//     const handleLogoClick = () => {
//         context.clearSearch();    // 🧹 Очистка пошуку при кліку на логотип
//         navigate('/');            // 🔥 Перехід на головну
//         closeMenu();              // 📱 Закриття mobile-меню
//     };

//     const handleCategoryClick = (category = '') => {
//         context.setSearchByCategory(category); // 🔄 Фільтр по категорії
//         context.clearSearch();                  // 🧹 Скидання текстового пошуку
//         closeMenu();                            // 📱 Закриття mobile-меню
//     };

//     return (
//         <nav className="flex justify-between items-center fixed top-0 w-full bg-white shadow-md z-10 py-4 px-6 md:px-10 transition-all duration-300">
//             <div className="flex items-center">
//                 {/* Mobile Burger Button */}
//                 <button
//                     className="md:hidden text-gray-800 hover:text-blue-600 p-2"
//                     onClick={toggleMenu}
//                 >
//                     {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
//                 </button>

//                 {/* Logo */}
//                 <div
//                     className="font-bold text-xl text-gray-800 cursor-pointer hover:text-blue-600 transition-colors ml-2"
//                     onClick={handleLogoClick}
//                 >
//                     Shopi
//                 </div>
//             </div>

//             {/* Categories Menu */}
//             <ul
//                 className={`${isMenuOpen ? 'flex flex-col' : 'hidden'} md:flex md:flex-row items-center gap-4 md:gap-6 absolute md:static top-16 left-0 w-full bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 transition-all duration-300 ease-in-out transform ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
//             >
//                 {[
//                     { path: '/', label: 'All', category: '' },
//                     { path: '/laptops', label: 'Laptops', category: 'laptops' },
//                     { path: '/tablets', label: 'Tablets', category: 'tablets' },
//                     { path: '/cameras', label: 'Cameras', category: 'cameras' },
//                     { path: '/headphones', label: 'Headphones', category: 'headphones' },
//                     { path: '/cellphones', label: 'Cellphones', category: 'cellphones' },
//                     { path: '/accessories', label: 'Accessories', category: 'accessories' }
//                 ].map(({ path, label, category }) => (
//                     <li key={path} className="w-full md:w-auto">
//                         <NavLink
//                             to={path}
//                             onClick={() => handleCategoryClick(category)}
//                             className={({ isActive }) =>
//                                 isActive
//                                     ? activeStyle
//                                     : "text-gray-600 hover:text-blue-600 transition-colors block w-full md:inline-block"
//                             }
//                         >
//                             {label}
//                         </NavLink>
//                     </li>
//                 ))}
//             </ul>

//             {/* User Actions */}
//             <ul className="flex items-center gap-6">
//                 <li className="text-gray-500">silvi@platzi.com</li>
//                 <li>
//                     <NavLink
//                         to="/my-orders"
//                         onClick={closeMenu}
//                         className={({ isActive }) =>
//                             isActive
//                                 ? activeStyle
//                                 : "text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap"
//                         }
//                     >
//                         My orders
//                     </NavLink>
//                 </li>
//                 <li className="flex items-center gap-2">
//                     <NavLink
//                         to="/cart-shopping"
//                         onClick={closeMenu}
//                         className={({ isActive }) =>
//                             isActive
//                                 ? activeStyle
//                                 : "text-gray-600 hover:text-blue-600 transition-colors"
//                         }
//                     >
//                         <ShoppingCartIcon className="h-6 w-6 text-gray-800 hover:text-blue-600 transition-colors" />
//                     </NavLink>
//                     {context.productsCount > 0 && (
//                         <div className="flex justify-center items-center bg-blue-100 text-blue-600 w-6 h-6 rounded-full text-sm font-medium">
//                             {context.productsCount}
//                         </div>
//                     )}
//                 </li>
//             </ul>
//         </nav>
//     );
// };
