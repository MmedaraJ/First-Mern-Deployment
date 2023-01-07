import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link, 
  Switch,
  Route
} from "react-router-dom";

import Detail from "../views/Detail";
import Main from "../views/Main";
import Update from "../views/Update";

const ProductList = (props) => {
    return(
        <BrowserRouter>
            <div>
                {
                    props.products.map((product, i) => {
                        return(
                            <p key={i}>
                                <Link to={`/products/${product._id}`}>{product.title}, {product.price}, {product.description}</Link>
                            </p>
                        );
                    })
                }
            </div>
        </BrowserRouter>
    );
}

export default ProductList;