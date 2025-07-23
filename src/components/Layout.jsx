import PropTypes from 'prop-types';

export const Layout = ({ children }) => {
    return (
        <div className="flex flex-col mx-auto items-center mt-20 mb-40 max-w-screen-xl w-full px-4">
            {children}
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};