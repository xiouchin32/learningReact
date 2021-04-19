import React, { createContext, useReducer } from "react";
import { productReducer, shoppingCartReducer, ProductActions, ShoppingCartActions } from "./reducer";

export interface ProductType {
    id: number;
    name: string;
    price: number;
}

export interface InitStateType {
    products: ProductType[];
    shoppingCart: number;
}

const initState = {
    products: [],
    shoppingCart: 0,
};

const AppContext = createContext<{
    state: InitStateType;
    dispatch: React.Dispatch<ProductActions | ShoppingCartActions>;
}>({
    state: initState,
    dispatch: () => null,
});

const mainReducer = ({ products, shoppingCart }: InitStateType, action: ProductActions | ShoppingCartActions) => ({
    products: productReducer(products, action),
    shoppingCart: shoppingCartReducer(shoppingCart, action),
});

const AppProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(mainReducer, initState);

    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
