import './index.css';
import { useContext,useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import cartContext from '../../context/cart/cartContext';

const Checkout = () => {

    const navigate = useNavigate();
    const cartDetailsFromContext = useContext(cartContext);
    const [orderPlaced, setOrderPlaced] = useState({ items:"", total:"" });
    const [addressDetails, setAddressDetails]= useState({items:"", total:"" ,country:'',fullName:'',houseName:'',mandalName:'',mobileNumber:'',pincode:'',stateName:'',villName:''})


    const CheckoutItem = (props) => {
        const { eachItem } = props;
        const { id, imgUrl, isChecked, quantity, title, price } = eachItem;

        return (
            <li className='checkout-page-items'>
                <img className='' src={imgUrl} alt="checkout img" />
                <p>{title}</p>
                <p>{quantity}</p>
                <p>{price}</p>
            </li>
        )
    }

    const addressFunc = async () => {
        const userId = localStorage.getItem("userId")
        const url = `http://localhost:8080/orders/addresses/${userId}`
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        console.log(data.addressDetails);
        const {items,total, country, fullName, houseName, mandalName, mobileNum, pincode, stateName, villName} = data.addressDetails[0];


        setAddressDetails({items, total, country, fullName, houseName, mandalName, mobileNum, pincode, stateName, villName})
    }


    useEffect(() => {
        addressFunc()
    }, [])



    // Calculate the grand total
    //the reduce function is used to iterate over the checkoutArr array and calculate the sum of the product of quantity and price for each item
    const grandTotal = cartDetailsFromContext.checkoutArr.reduce(
        (total, item) => total + item.quantity * item.price,
        0
    );
    
    const handleOnclickconfirm = ()=>{
        // navigate('/confirm');
        
    }

    return (
        <div className='checkout-page__bg-container'>
            <h1>Checkout</h1>
            {cartDetailsFromContext.checkoutArr.map(eachItem => <CheckoutItem key={eachItem.id} eachItem={eachItem} />)}
            <div>
            <ul className='checkout-page__checkout-address-card'>
                {console.log(addressDetails)}
                <li className='checkout-page__checkout-address-card-items address-text'>Address:</li>
                <li className='checkout-page__checkout-address-card-items'>{addressDetails.fullName}</li>
                <li className='checkout-page__checkout-address-card-items'>{addressDetails.houseName}</li>
                <li className='checkout-page__checkout-address-card-items'>{addressDetails.streetName}</li>
                <li className='checkout-page__checkout-address-card-items'>{addressDetails.villName}</li>
                <li className='checkout-page__checkout-address-card-items'>{addressDetails.mandalName}, {addressDetails.stateName}, {addressDetails.pincode}</li>
            </ul>

            <div className='checkout-page__checkout-payment-card'>
                Payment  
            </div>
                <p className='grandtotal'>Grand Total: ${grandTotal.toFixed(2)}</p>
            </div>
            <div>
                <button type='button' className='conform-button'onClick={()=>handleOnclickconfirm()}>Confirm</button>
            </div>
        </div>
    )
}


export default Checkout;