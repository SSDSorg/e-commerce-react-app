// import './index.css';
// import { useContext,useState,useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// import cartContext from '../../context/cart/cartContext';

// const MyOrderlist = () => {

//     const navigate = useNavigate();
//     const cartDetailsFromContext = useContext(cartContext);
//     const [orderPlaced, setOrderPlaced] = useState();
//     const [addressDetails, setAddressDetails]= useState({items:"", total:"" ,country:'',fullName:'',houseName:'',mandalName:'',mobileNumber:'',pincode:'',stateName:'',villName:''})


//     const CheckoutItem = (props) => {
//         const { eachItem } = props;
//         const { id, imgUrl, isChecked, quantity, title, price } = eachItem;

//         return (
//             <li className='checkout-page-items'>
//                 <img className='' src={imgUrl} alt="checkout img" />
//                 <p>{title}</p>
//                 <p>{quantity}</p>
//                 <p>{price}</p>
//             </li>
//         )
//     }

//     const addressFun = async () => {
//         const userIdFromUrl = localStorage.getItem("userIdFromUrl")
//         const url = `http://localhost:8080/pastorders/fetch/${userIdFromUrl}`
//         const response = await fetch(url);
//         const data = await response.json();
//         console.log(data);
//         console.log(data.addressDetails);

//     const addressDetails = data.addressDetails;
//         if (!addressDetails) {
//          console.error('No address details found in the response');
//         return;
//         }

//         const {items,total, country, fullName, houseName, mandalName, mobileNum, pincode, stateName, villName} = addressDetails;


//         setAddressDetails({items, total, country, fullName, houseName, mandalName, mobileNum, pincode, stateName, villName})
//     }


//     useEffect(() => {
//         addressFun()
//     }, [])



//     // Calculate the grand total
//     //the reduce function is used to iterate over the checkoutArr array and calculate the sum of the product of quantity and price for each item
//     const grandTotal = cartDetailsFromContext.checkoutArr.reduce(
//         (total, item) => total + item.quantity * item.price,
//         0
//     );
    
//     // const handleOnclickconfirm = ()=>{
//     //     navigate('/confirm');
//     // }

//     return (
//         <div className='checkout-page__bg-container'>
//             <h1>My OrdersList</h1>
//             {cartDetailsFromContext.checkoutArr.map(eachItem => <CheckoutItem key={eachItem.id} eachItem={eachItem} />)}
//             <div>
//             <ul className='checkout-page__checkout-address-card'>
//                 {console.log(addressDetails)}
//                 <li className='checkout-page__checkout-address-card-items address-text'>Address:</li>
//                 <li className='checkout-page__checkout-address-card-items'>{addressDetails.fullName}</li>
//                 <li className='checkout-page__checkout-address-card-items'>{addressDetails.houseName}</li>
//                 <li className='checkout-page__checkout-address-card-items'>{addressDetails.streetName}</li>
//                 <li className='checkout-page__checkout-address-card-items'>{addressDetails.villName}</li>
//                 <li className='checkout-page__checkout-address-card-items'>{addressDetails.mandalName}, {addressDetails.stateName}, {addressDetails.pincode}</li>
//             </ul>

//             <div className='checkout-page__checkout-payment-card'>
//                 Payment  
//             </div>
//                 <p className='grandtotal'>Grand Total: ${grandTotal.toFixed(2)}</p>
//             </div>
//             {/* <div>
//                 <button type='button' className='conform-button'onClick={()=>handleOnclickconfirm()}>Confirm</button>
//             </div> */}
//         </div>
//     )
// }


// export default MyOrderlist;

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cartContext from '../../context/cart/cartContext';
import './index.css'
import { Link } from 'react-router-dom';


const MyOrderlist = () => {
    const navigate = useNavigate();
    const cartDetailsFromContext = useContext(cartContext);
    const [myOrders, setmyOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleViewDetails = (order) => {
        // Set the selected order for detailed view
        setSelectedOrder(order);
    };
    
    const handleRemoveItem = (orderId) => {
        // Make a request to the server to remove the item
        const url = `http://localhost:8080/removeItem/${orderId}`;

        fetch(url, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                // Update the order details in the state with the updated list
                setmyOrders(data.data);
                console.log('Item removed successfully');
            })
            .catch(error => console.error('Error removing item:', error));
    };

    useEffect(() => {
        const userIdFromUrl = localStorage.getItem("userIdFromUrl");
        const url = `http://localhost:8080/pastorders/fetch-create/${userIdFromUrl}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Assuming the server response is an array of orders
                setmyOrders(data.data);
            })
            .catch(error => console.error('Error fetching order details:', error));
    }, []);

    const OrderItem = (props) => {
        const { eachOrder, onViewDetails, onRemove } = props;
        const { _id, items, total, status, address } = eachOrder;
    
        return (
            <li className='orderlist-page-items'>
                <p>Order ID: {_id}</p>
                <p>Total: {total}</p>
                <p>Status: {status}</p>
    
                {/* Display shipping address details if available */}
                {address && (
                    <div>
                        <h3>Shipping Address:</h3>
                        <p>Name: {address.fullName}</p>
                        <p>Mobile Number: {address.mobileNum}</p>
                        <p>Address: {address.houseName}, {address.villName}, {address.mandalName}, {address.stateName} - {address.pincode}</p>
                        <p>Country: {address.country}</p>
                    </div>
                )}
    
                {/* Map through items if it's an array */}
                {items && items.map((item, index) => (
                    <div key={index}>
                        <h3>Item {index + 1}:</h3>
                        <p>Name: {item.name}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: {item.price}</p>
                        {/* <img src={data: ${item.image}} alt={item-${index}} /> */}
                    </div>
                ))}
    
                <button type='button' className='orderdetailsbutton' onClick={() => onViewDetails(eachOrder)}>View Details</button>
                <button type='button' className="orderdetailsbutton remove-button" onClick={() => onRemove(_id)}>Remove</button>
            </li>
        );
    };
    
    
    

    // const handleOnclickViewDetails = (orderId) => {
    //     // You can navigate to a detailed view of the order with the orderId
    //     navigate(/order-details/${orderId});
    // };
    
    return (
        <div className='orderlist-page__bg-container'>
             <h1>My Order List</h1>
            {cartDetailsFromContext && cartDetailsFromContext.myOrders.map(eachOrder => (
                <OrderItem
                    key={eachOrder.id}
                    eachOrder={eachOrder}
                    onViewDetails={handleViewDetails}
                    onRemove={handleRemoveItem}
                />
            ))}
            
            {selectedOrder && (
                <div>
                    <h2>Order Details</h2>
                    <img src={selectedOrder.imgUrl} alt="order img" />
                    <p>{selectedOrder.title}</p>
                    <p>Quantity: {selectedOrder.quantity}</p>
                    <p>Price: {selectedOrder.price}</p>
                    {/* Add other order details as needed */}
                    <p>Delivered: Yes</p>
                    {/* Add other order details as needed */}
                </div>
            )}    
        </div>
    )        
        
}


export default MyOrderlist;