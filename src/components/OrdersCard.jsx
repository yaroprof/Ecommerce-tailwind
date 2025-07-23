import PropTypes from 'prop-types';

export const OrdersCard = ({ totalPrice, totalProducts, date }) => {
  return (
    <div
      className="
        flex flex-col justify-between 
        p-4 
        w-full min-w-[200px] 
        bg-white 
        border-b border-gray-200 
        rounded-lg 
        shadow-sm
      "
    >
      {/* Дата й кількість артикулів */}
      <div className="mb-2 break-words">
        <p className="text-sm text-gray-600">Date: <span className="font-medium text-gray-800">{date}</span></p>
        <p className="text-sm text-gray-600">Total articles: <span className="font-medium text-gray-800">{totalProducts}</span></p>
      </div>

      {/* Сума замовлення */}
      <p className="text-lg font-bold text-teal-600 whitespace-nowrap">
        Total: {totalPrice}
      </p>
    </div>
  );
};

OrdersCard.propTypes = {
  totalPrice: PropTypes.number,
  totalProducts: PropTypes.number,
  date: PropTypes.string,
};
