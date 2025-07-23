import PropTypes from 'prop-types';
import { XMarkIcon } from '@heroicons/react/24/solid';

export const OrderCard = ({ id, title, imageUrl, price, quantity, handleDelete }) => {
    return (
        <div className="flex justify-between items-center px-4 mb-2">

            <h1 style={{ color: 'red' }}>OrderCard.jsx</h1>

            <div className="flex items-center gap-2">
                <figure className="w-20 h-20">
                    <img className="w-full h-full object-contain" src={imageUrl} alt={`Image ${title}`} />
                </figure>
                <div>
                    <p className="text-sm font-light">{title}</p>
                    <p className="text-sm text-gray-500">Price: ${price}</p>
                    {quantity && <p className="text-sm text-gray-500">Quantity: {quantity}</p>}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <p className="font-medium text-lg text-red-800">${price * (quantity || 1)}</p>
                {handleDelete && (
                    <XMarkIcon
                        className="h-6 w-6 text-black cursor-pointer"
                        onClick={() => handleDelete(id)}
                    />
                )}
            </div>
        </div>
    );
};

OrderCard.propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number,
    handleDelete: PropTypes.func,
};