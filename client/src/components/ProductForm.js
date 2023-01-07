import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const PersonForm = () => {
    const [state, setState] = useState({
        title: "",
        price: 0,
        description: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        //post req to create a new person
        axios.post(
            "http://localhost:8000/api/products/new", 
            {
                "title": state.title,
                "price": state.price,
                "description": state.description,
                "email": state.email,
                "password": state.password,
                "confirmPassword": state.confirmPassword
            },
            { withCredentials: true }
        )
            .then(res => {
                console.log(res);
                //history.push(`products/${res.data._id}`);
            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];

                for(const key of Object.keys(errorResponse)){
                    errorArr.push(errorResponse[key].message);
                }
                setErrors(errorArr);
            });

        /* Async
            async function oneAfterAnother(startingVal) {
                try{
                    const firstResult = await firstFunc(startingVal);
                    const secondResult = await secondFunc(firstResult);
                }catch(error){
                    //do something
                }
            
                return secondResult;
            }
        */
    }

    const onInputChange = (e) => {
        let title = state.title;
        let price = state.price;
        let description = state.description;
        let email = state.email;
        let password = state.password;
        let confirmPassword = state.confirmPassword;

        switch(e.target.name){
            case "title":
                title = e.target.value;
                break;
            case "price":
                price = e.target.value;
                break;
            case "description":
                description = e.target.value;
                break;
            case "email":
                email = e.target.value;
                break;
            case "password":
                password = e.target.value;
                break;
            case "confirmPassword":
                confirmPassword = e.target.value;
                break;
            default:
        }

        setState({
            title: title,
            price: price,
            description: description,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        });
    }

    return(
        <form onSubmit={onSubmitHandler}>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <p>
                <label>Title: </label>
                <input
                    type="text"
                    name="title"
                    minLength="3"
                    value={state.title}
                    onChange={onInputChange}
                    required
                />
            </p>
            <p>
                <label>Price: </label>
                <input
                    type="number"
                    name="price"
                    min="1"
                    value={state.price}
                    onChange={onInputChange}
                    required
                />
            </p>
            <p>
                <label>Description: </label>
                <input
                    type="text"
                    name="description"
                    minLength="5"
                    value={state.description}
                    onChange={onInputChange}
                    required
                />
            </p>
            <p>
                <label>Email: </label>
                <input
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={onInputChange}
                    required
                />
            </p>
            <p>
                <label>Password: </label>
                <input
                    type="password"
                    name="password"
                    minLength="8"
                    value={state.password}
                    onChange={onInputChange}
                    required
                />
            </p>
            <p>
                <label>Confirm Password: </label>
                <input
                    type="password"
                    name="confirmPassword"
                    minLength="8"
                    value={state.confirmPassword}
                    onChange={onInputChange}
                    required
                />
            </p>
            <input
                type="submit"
            />
        </form>
    );
}

export default PersonForm;