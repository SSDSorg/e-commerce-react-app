import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';


const OrderDetailsPage = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);
    // Fetch order details based on orderId from the server or context
    
    useEffect(() => {
        // Fetch order details based on orderId from the server
        const url = `http://localhost:8080/pastorders/fetch/${orderId}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Update the order details state
                setOrderDetails(data);
            })
            .catch(error => console.error('Error fetching order details:', error));
    }, [orderId]);

    return (
        <div>
            {/* Display order details here */}
            <h1>Order Details</h1>
            {/* Add components or content to display order details */}
            {orderDetails ? (
                <div>
                    {/* Display order details here */}
                    <p>Order ID: {orderDetails.id}</p>
                    {/* Add other order details as needed */}
                    <p>Delivered: {orderDetails.delivered ? 'Yes' : 'No'}</p>
                    {/* Add other order details as needed */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default OrderDetailsPage;
