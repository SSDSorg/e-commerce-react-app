import './index.css';
import {AiOutlineHeart, AiOutlineShoppingCart} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import cartContext from "../../context/cart/cartContext";
import { useContext } from 'react';

const tabItemsArr = [
    {
        id: '1',
        tabTitle: 'wishlist',
        path: '/liked-products',
        icon: <AiOutlineHeart className='header-page__tab-icons' />
    },
    {
        id: '2',
        tabTitle: 'cart',
        path: '/cart',
        icon: <AiOutlineShoppingCart className='header-page__tab-icons' />
    },
]

const Header = () => {
    const cartDetailsFromContext = useContext(cartContext);
    
    
    const TabItem = (props) => {
        const {tab} = props;
        const {tabTitle, icon, path} = tab;
        
        const filterBasedOnTabTitle = () => {
            if (tabTitle === 'cart') {
                return (
                    <li className='header-page__header-tab-items'>
                        <Link to={path} className='header-page__header-link-items'>
                            {icon}
                            {cartDetailsFromContext.state.length > 0 && <p className='header-page__cart-count'>{cartDetailsFromContext.state.length}</p>}
                            {console.log(cartDetailsFromContext.state.length)}
                        </Link>
                    </li>
                )
            }
            else {
                return (
                    <li className='header-page__header-tab-items'>
                        <Link to={path} className='header-page__header-link-items'>
                            {icon}
                        </Link>
                    </li>
                )
            }
        }

        return (
            <>
                {filterBasedOnTabTitle()}
            </>
        )
    }


    return (
        <nav className='header-page__header-section'>
            <img className='header-page__header-logo' src='/logo192.png' alt='company logo'/>

            <ul className='header-page__header-tabs-card'>
                {tabItemsArr.map(tab => <TabItem key={tab.id} tab={tab} />)}
            </ul>
        </nav>
    )
}


export default Header;