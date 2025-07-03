import React, { createContext, useReducer, useContext } from "react";

const ACTIONS = {
    ADD: "add",
    UPDATE: "update",
    DELETE: "delete",
};

const initialState = [
    { id: 1, name: "Prodotto A", price: 10.0, availability: "Disponibile", category: "Elettronica" },
    { id: 2, name: "Prodotto B", price: 25.0, availability: "Esaurito", category: "Casa" },
    { id: 3, name: "Prodotto C", price: 15.5, availability: "Disponibile", category: "Giochi" },
];

function productsReducer(state, action) {
    switch (action.type) {
        case ACTIONS.ADD:
            return [...state, action.payload];

        case ACTIONS.UPDATE:
            return state.map((product) =>
                product.id === action.payload.id ? { ...product, ...action.payload } : product
            );

        case ACTIONS.DELETE:
            return state.filter((product) => product.id !== action.payload.id);

        default:
            return state;
    }
}

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
    const [products, dispatch] = useReducer(productsReducer, initialState);

    const addProduct = (product) => {
        dispatch({ type: ACTIONS.ADD, payload: product });
    };

    const updateProduct = (product) => {
        dispatch({ type: ACTIONS.UPDATE, payload: product });
    };

    const deleteProduct = (id) => {
        dispatch({ type: ACTIONS.DELETE, payload: { id } });
    };

    return (
        <ProductsContext.Provider value={{ products, dispatch, addProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductsContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error("useProducts deve essere usato all'interno di un ProductsProvider");
    }
    return context;
}
