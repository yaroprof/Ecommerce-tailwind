import { NavLink } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { ProductsContext } from '../context/ProductsContext';
import { ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const activeStyle = 'text-indigo-600 font-semibold underline underline-offset-4';

export const NavBar = () => {
  const { productsCount } = useContext(CartContext);
  const { items, setSearchByCategory, setSearchByTitle, searchByTitle } = useContext(ProductsContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState(['all']);
  const [isAtTop, setIsAtTop] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const toggleSearch = () => setShowSearch(prev => !prev);

  const handleCategoryClick = (category) => {
    setSearchByCategory(category === 'all' ? '' : category);
    setSearchByTitle('');
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (items?.length > 0) {
      const unique = [...new Set(items.map(item => item.category))];
      setCategories(['all', ...unique]);
    }
  }, [items]);

  useEffect(() => {
    const handleScroll = () => setIsAtTop(window.scrollY < 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const nav = document.querySelector('nav');
      if (showSearch && nav && !nav.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSearch]);

  return (
    <nav
      className={`fixed top-0 w-full z-20 transition-all duration-300 
        ${isAtTop ? 'bg-white/80 backdrop-blur-md border-b-0 shadow-none' : 'bg-white border-b shadow-sm'} 
        px-6 py-3 md:px-12 flex items-center justify-between flex-wrap gap-4`}
    >
      {/* LEFT: Logo */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-gray-800 hidden sm:block">
          <NavLink to="/" onClick={() => { handleCategoryClick('all'); setIsMenuOpen(false); }}>
            Shoper
          </NavLink>
        </h1>
      </div>

      {/* CENTER: Menu (desktop) */}
      <ul className="hidden md:flex gap-6 items-center">
        {categories.map(category => (
          <li key={category}>
            <NavLink
              to={category === 'all' ? '/' : `/${category.toLowerCase()}`}
              onClick={() => handleCategoryClick(category)}
              className={({ isActive }) =>
                isActive ? activeStyle : 'text-gray-600 hover:text-indigo-600 transition-colors'
              }
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* RIGHT: Search, Orders, Cart, Burger */}
      <div className="flex items-center gap-4">
        {/* Search Toggle Button (moved to right) */}
        <button onClick={toggleSearch} className="text-gray-600 hover:text-indigo-600 transition-colors">
          <MagnifyingGlassIcon className="h-6 w-6" />
        </button>

        <NavLink
          to="/my-orders"
          className={({ isActive }) =>
            isActive ? activeStyle : 'text-gray-600 hover:text-indigo-600 transition-colors'
          }
        >
          My orders
        </NavLink>
        <div className="relative">
          <NavLink
            to="/cart-shopping"
            className={({ isActive }) =>
              isActive ? activeStyle : 'text-gray-600 hover:text-indigo-600 transition-colors'
            }
          >
            <ShoppingCartIcon className="h-6 w-6 text-gray-800" />
          </NavLink>
          {productsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-indigo-100 text-indigo-600 w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold">
              {productsCount}
            </span>
          )}
        </div>
        {/* Burger Menu */}
        <button onClick={toggleMenu} className="md:hidden">
          {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="w-full md:hidden mt-4 bg-white shadow-md px-6 py-4 flex flex-col gap-3">
          {categories.map(category => (
            <li key={category}>
              <NavLink
                to={category === 'all' ? '/' : `/${category.toLowerCase()}`}
                onClick={() => handleCategoryClick(category)}
                className={({ isActive }) =>
                  isActive ? activeStyle : 'text-gray-600 hover:text-indigo-600 transition-colors'
                }
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </NavLink>
            </li>
          ))}
        </ul>
      )}

      {/* Search Panel with Animation */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md transition-all duration-300 ease-in-out overflow-hidden ${
          showSearch ? 'h-16' : 'h-0'
        }`}
      >
        <div className="p-4">
          <input
            type="text"
            value={searchByTitle}
            onChange={(e) => setSearchByTitle(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          />
        </div>
      </div>
    </nav>
  );
};