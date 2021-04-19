import React, { useContext } from "react";
import { AppContext } from "./productcontext";
import { Types } from "./reducer";

const Products = () => {
    const { state, dispatch } = useContext(AppContext);

    return (
        <div>
            <button
                onClick={() => {
                    dispatch({
                        type: Types.Add,
                    });
                }}
            >
                click
            </button>
            {state.shoppingCart}
        </div>
    );
};

export default Products;
