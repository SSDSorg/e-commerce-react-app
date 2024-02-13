// import { useNavigate } from 'react-router-dom';
import './index.css';
import { useEffect, useState} from 'react';

const MyOrderlist = () => {

    // const navigate = useNavigate();
    const [ordersArr, setOrdersArr] = useState([]); 




    const getOrders = async () => {
        const userId = localStorage.getItem('userId');
        const url = `http://localhost:8080/orders/getAllOrders/${userId}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.orders)

        if (!response.ok) {
            alert(data.err_msg);
        }

        setOrdersArr(data.orders);
    }


    useEffect(() => {
        getOrders();
    }, []);


    const OrderItem = (props) => {
        const {order} = props;
        const {_id,address, products, status, total} = order;


        const ProductItem = (props) => {
            const {product} = props;
            const {description,imgUrl,price,title, _id} = product;

            return (
                <li className='myorderlist-page__myorders-list-item-product-card-item'>
                    <img className='myorderlist-page__myorders-list-item-product-img' src={imgUrl} alt='product img'/>
                    <div className='myorderlist-page__myorders-list-item-product-details'>
                        <p className='myorderlist-page__myorders-list-item-product-title'>{title}</p>
                        <p className='myorderlist-page__myorders-list-item-product-description'>{description}</p>
                        <p className='myorderlist-page__myorders-list-item-product-price'>${price}</p>
                    </div>
                </li>
            )
        }

        return (
            <li className='myorderlist-page__myorders-list-item'>
                 <p className='myorderlist-page__myorders-list-item-order-id'>Order ID: {_id}</p>
                <p className='myorderlist-page__myorders-list-item-delivery-status'>Delivery status: {status}</p>

                <ul className='myorderlist-page__myorders-list-item-product-card'>
                    {products.map(product => <ProductItem key={product._id} product={product}/>)}
                </ul>

                <p  className='myorderlist-page__myorders-list-item-total-price'>Total: ${total}</p>
            </li>
        )
    }


    return (
        <div className='myorderlist-page__bg-container'>
            <h2 className='myorderlist-page__myorders-text'>My Orders List</h2> 
            <ul className='myorderlist-page__myorders-list'>
                {ordersArr.map(order => <OrderItem key={order._id} order={order}/>)}
            </ul>
        </div>
    )
}

export default MyOrderlist;