import './index.css';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


const ProductDetails = () => {

    //Returns an object of key/value pairs of the dynamic params from the current URL that were matched by the route path.
    const {id} = useParams()
    
    //declaring useState variable inside the component
    const [productDetails, setProductDetails] = useState({title: '', brand: '', price: '', rating: '', images: []})



    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        const url =`https://dummyjson.com/products/${id}`
        const response = await fetch(url)
        const data = await response.json()

        if (!response.ok) {
            alert("Backend Error")
        }
        else {
            setProductDetails(data)
        }
    }


    return (
        <div className="product-details-page__bg-container">
            <div className='product-details-page__product-details-card'>
            
            </div>
        </div>
    )

    

}

export default ProductDetails;