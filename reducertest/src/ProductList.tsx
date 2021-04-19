import React, { Component, useContext, useState } from "react";
import { AppContext } from "./productcontext";
import { Types } from "./reducer";

const ProductList = () => {
    const [form, setform] = useState({ name: "", price: 0 });

    const { state, dispatch } = useContext(AppContext);
    console.log(state);

    const handleForm = (type: string, value: string) => {
        setform((form) => ({ ...form, [type]: value }));
    };

    const createProduct = () => {
        dispatch({
            type: Types.Create,
            payload: {
                id: Math.round(Math.random() * 10000),
                name: form.name,
                price: form.price,
            },
        });
    };

    const deleteProduct = (id: number) => {
        dispatch({
            type: Types.Delete,
            payload: {
                id,
            },
        });
    };
    return (
        <div>
            <input
                value={form.name}
                onChange={(e) => {
                    handleForm("name", e.target.value);
                }}
                placeholder="Name"
            />
            <input
                value={form.price}
                type="number"
                onChange={(e) => {
                    handleForm("price", e.target.value);
                }}
                placeholder="Price"
            />
            <button onClick={createProduct}>create</button>
            <div style={{ marginTop: 20 }}>
                {state.products.map((c) => (
                    <div>
                        <span>{c.name}</span>
                        <span>{c.price}</span>
                        <button onClick={() => deleteProduct(c.id)}>delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
