import './index.css';
import { useContext,useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import cartContext from '../../context/cart/cartContext';

const Checkout = () => {

    const navigate = useNavigate();
    const cartDetailsFromContext = useContext(cartContext);
    // const [orderPlaced, setOrderPlaced] = useState({ items:"", total:"" });
    const [addressDetails, setAddressDetails]= useState({addressId: "", tems:"", total:"" ,country:'',fullName:'',houseName:'',mandalName:'',mobileNumber:'',pincode:'',stateName:'',villName:''})

    const [isOrderPlacedSuccessfully, setIsOrderPlacedSuccessfully] = useState(false)

    const CheckoutItem = (props) => {
        const { eachItem } = props;
        const { _id, imgUrl, isChecked, quantity, title, price } = eachItem;

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
        const url = `http://localhost:8080/address/getAddress/${userId}`
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        console.log(data.addressDetails);
        const {_id, items,total, country, fullName, houseName, mandalName, mobileNum, pincode, stateName, villName} = data.addressDetails[0];


        setAddressDetails({addressId: _id, items, total, country, fullName, houseName, mandalName, mobileNum, pincode, stateName, villName})
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


    const SuccessMsgCard = () => {
        return (
            <div className='checkout-page__success-card'>
                <img src='/Checkmark-Animation-Gif.gif' alt='checkmark gif'/>
                <p>Your order has been confirmed! 😍</p>
            </div>
        )
    }

    
    const handleOnclickconfirm = async () =>{
        // navigate('/confirm');
        

        const userId = localStorage.getItem("userId")
        const url = `http://localhost:8080/orders/placeOrder`
        const checkoutProductsIds = cartDetailsFromContext.checkoutArr.map(product => product._id);
        console.log(checkoutProductsIds)
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                userId, 
                products: checkoutProductsIds,
                total: grandTotal.toFixed(2),
                address: addressDetails.addressId
            })
        }
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        
        if (!response.ok) {
            alert(data.err_msg)
        }

        setIsOrderPlacedSuccessfully(true);

        setTimeout(() => {
            setIsOrderPlacedSuccessfully(false);
            navigate('/')
        }, 3000)
    }

    return (
        <div className='checkout-page__bg-container'>
            {
                isOrderPlacedSuccessfully 
                ? <SuccessMsgCard/> 
                :
                <>
                    <h1>Checkout</h1>
                    {cartDetailsFromContext.checkoutArr.map(eachItem => <CheckoutItem key={eachItem._id} eachItem={eachItem} />)}
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
                        <button type='button' className='conform-button' onClick={()=>handleOnclickconfirm()}>Confirm</button>
                    </div>
                </>
            }
        </div>
    )
}


export default Checkout;