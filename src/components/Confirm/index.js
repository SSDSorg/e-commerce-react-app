import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Confirm = () => {
    const navigate = useNavigate();
    const [orderConfirmed, setOrderConfirmed] = useState({items:"",total:""});

    const handleConfirmOrder = async () => {
        const userIdFromUrl = localStorage.getItem("userIdFromUrl")
        const url = `http://localhost:8080/pastorders/fetch-and-create/${userIdFromUrl}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setOrderConfirmed(true);
    }

    const handleBackToCheckout = () => {
        // If the order is not confirmed, navigate back to the checkout page
        if (!orderConfirmed) {
            navigate('/checkout');
        }
        
        else{
            
        }
    }

    return (
        <div className='confirm-page__bg-container'>
            <h1>Confirm</h1>
            {/* Display confirmation message or other content based on orderConfirmed state */}
            {orderConfirmed ? (
            <ul className='confirm-page__confirm-address-card'>
                <p>Your order has been confirmed! 😍</p>
            
                {console.log(orderConfirmed)}
                <li className='confirm-page__confirm-address-card-items address-text'></li>
                <li className='confirm-page__confirm-address-card-items'>{orderConfirmed.fullName}</li>
                <li className='confirm-page__confirm-address-card-items'>{orderConfirmed.houseName}</li>
                <li className='confirm-page__confirm-address-card-items'>{orderConfirmed.streetName}</li>
                <li className='confirm-page__confirm-address-card-items'>{orderConfirmed.villName}</li>
                <li className='confirm-page__confirm-address-card-items'>{orderConfirmed.mandalName}, {orderConfirmed.stateName}</li>
            </ul>

            ) : (
                <div>
                    {/* Display additional content related to the confirmation page */}
                    {/* ... */}

                    {/* Button to confirm the order */}
                    <button type='button' className='conform-button' onClick={handleConfirmOrder}>
                        Confirm Order
                    </button>

                    {/* Button to go back to the checkout page */}
                    <button type='button' className='back-to-checkout-button' onClick={handleBackToCheckout}>
                        Back to Checkout
                    </button>
                </div>
            )}
        </div>
    );
}

export default Confirm;