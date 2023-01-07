import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PersonForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

const Main = () => {
    const [loaded, setLoaded] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(
            "http://localhost:8000/api/products",
            { withCredentials: true },
        )
            .then(res => {
                setProducts(res.data);
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, []);

    return(
        <div>
            <PersonForm/>
            <hr/>
            {
                loaded && <ProductList products={products}/>
            }
        </div>
    );
}

export default Main;