import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";

const Update = (props) => {
    const {id} = useParams();
    const [state, setState] = useState({
        title: "",
        price: 0,
        description: ""
    });

    useEffect(() => {
        axios.get(
            `http://localhost:8000/api/products/${id}`,
            { withCredentials: true },
        )
            .then(res => {
                setState({
                    title: res.data.title,
                    price: res.data.price,
                    description: res.data.description,
                });
            })
            .catch();
    }, []);

    const updateProduct = (e) => {
        e.preventDefault();
        axios.put(
            `http://localhost:8000/api/products/update/${id}`, 
            {
                "title": state.title,
                "price": state.price,
                "description": state.description
            },
            { withCredentials: true },
        )
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    return(
        <div>
            <h1>Update a person</h1>
            <form onSubmit={updateProduct}>
            <p>
                <label>Title: </label>
                <input
                    type="text"
                    name="title"
                    value={state.title}
                    onChange={(e) => setState({
                        title: e.target.value,
                        price: state.price,
                        description: state.description         
                    })}
                />
            </p>
            <p>
                <label>Price: </label>
                <input
                    type="number"
                    name="price"
                    value={state.price}
                    onChange={(e) => setState({
                        title: state.title,
                        price: e.target.value,
                        description: state.description
                    })}
                />
            </p>
            <p>
                <label>Descriptiont: </label>
                <input
                    type="text"
                    name="description"
                    value={state.description}
                    onChange={(e) => setState({
                        title: state.title,
                        price: state.price,
                        description: e.target.value
                    })}
                />
            </p>
            <input
                type="submit"
            />
        </form>
        </div>
    );
}

export default withRouter(Update);