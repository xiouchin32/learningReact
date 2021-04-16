import React, { createContext } from "react";

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

const AppContext = createContext<InitStateType>(initState);vup ej; 
