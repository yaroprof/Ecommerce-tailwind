// v2.0
import PropTypes from 'prop-types';

export const Layout = ({ children }) => {
    return (
        // Зміни:
        // 1. Прибрали `max-w-screen-xl` з Layout. Тепер Layout займає всю ширину.
        // 2. Змінили `px-4` на більші адаптивні відступи `px-4 sm:px-6 lg:px-8`.
        //    Це забезпечить "поля" з боків, які збільшуються на більших екранах,
        //    але не обмежуватимуть загальну ширину.
        // 3. Залишили `mx-auto` та `items-center` - вони центруються в межах батьківського контейнера,
        //    яким тепер є все вікно.
        // 4. `pt-24` замість `mt-20` для відступу від Navbar, щоб уникнути проблем з маржинами та колапсом.
        // 5. Додано `min-h-screen` для забезпечення, що лейаут займає всю висоту вікна.
      <div className="flex flex-col items-center w-full min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};


// v1.0
// import PropTypes from 'prop-types';

// export const Layout = ({ children }) => {
//     return (
//         <div className="flex flex-col mx-auto items-center mt-20 mb-40 max-w-screen-xl w-full px-4">
//             {children}
//         </div>
//     );
// };

// Layout.propTypes = {
//     children: PropTypes.node.isRequired,
// };