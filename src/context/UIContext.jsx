import { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
    const [showProductDetail, setShowProductDetail] = useState({});

    const value = useMemo(() => ({
        isProductDetailOpen,
        openProductDetail: () => setIsProductDetailOpen(true),
        closeProductDetail: () => setIsProductDetailOpen(false),
        showProductDetail,
        setShowProductDetail,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu: () => setIsCheckoutSideMenuOpen(true),
        closeCheckoutSideMenu: () => setIsCheckoutSideMenuOpen(false),
    }), [isProductDetailOpen, isCheckoutSideMenuOpen, showProductDetail]);

    return (
        <UIContext.Provider value={value}>
            {children}
        </UIContext.Provider>
    );
};

UIProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
