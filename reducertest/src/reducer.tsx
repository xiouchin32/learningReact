import { ProductType } from "./productcontext";

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
              type: Key;
          }
        : {
              type: Key;
              payload: M[Key];
          };
};

export enum Types {
    Create = "CREATE_PRODUCT",
    Delete = "DELETE_PRODUCT",
    Add = "ADD_PRODUCT",
}

type ProductPayload = {
    [Types.Create]: {
        id: number;
        name: string;
        price: number;
    };
    [Types.Delete]: {
        id: number;
    };
};

export type ProductActions = ActionMap<ProductPayload>[keyof ActionMap<ProductPayload>];

export const productReducer = (state: ProductType[], action: any) => {
    switch (action.type) {
        case "CREATE_PRODUCT":
            return [
                ...state,
                {
                    id: action.payload.id,
                    name: action.payload.name,
                    price: action.payload.price,
                },
            ];
        case "DELETE_PRODUCT":
            return [...state.filter((product) => product.id !== action.payload.id)];
        default:
            return state;
    }
};

export const shoppingCartReducer = (state: any, action: any) => {
    switch (action.type) {
        case "ADD_PRODUCT":
            return state + 1;
        default:
            return state;
    }
};
