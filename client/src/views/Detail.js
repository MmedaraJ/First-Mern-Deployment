import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, useParams, withRouter } from "react-router-dom";

const Detail = () => {
    const [product, setProduct] = useState({});
    const {id} = useParams();

    useEffect(() => {
        axios.get(
            `http://localhost:8000/api/products/${id}`,
            { withCredentials: true },
        )
            .then(res => {
                console.log(`Gotten user: ${res.data}`);
                setProduct(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return(
        <div>
            <BrowserRouter>
                <p>Title: {product.title}</p>
                <p>Price: {product.price}</p>
                <p>Description: {product.description}</p>
                <Link to={`/update/product/${product._id}`}>Edit</Link>
            </BrowserRouter>
        </div>
    );
}

export default withRouter(Detail);