import { apiConnector } from "../apiconnector";
import axios from "axios";

export async function getCartByUserId() {
    try{
        const response = await apiConnector('GET', `http://localhost:4000/api/v1/cart/`);
        console.log("GET_CART_BY_USER_ID_API RESPONSE....", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        return response.data;
    } catch(err){
        console.log("Error Fetching Cart Details...", err);
        throw err;
    }
}


export async function addToCart(userId: string, productId: string, quantity: string) {
    try{
        const response = await apiConnector('POST', `http://localhost:4000/api/v1/cart/addToCart`, {
            userId,
            productId,
            quantity,
        });
        console.log("ADD_TO_CART_API RESPONSE.....", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        return response.data;
    } catch(err){
        console.log("Error in Adding Items to Cart...", err);
        throw err;
    }
}


export async function removeFromCart(userId: string, productId: string) {
    try{
        const response = await apiConnector('DELETE', `http://localhost:4000/api/v1/cart/removeFromCart`, {
            userId, 
            productId,
        });

        console.log("REMOVE_FROM_CART_API RESPONSE.....", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        return response.data;
    } catch(err){
        console.log("Error while removing Product from Cart...", err);
        throw err;
    }
}


export async function updateItemQuantity(userId: string, productId: string, quantity: string) {
    try{
        const response = await apiConnector('PUT', `http://localhost:4000/api/v1/cart/update`, {
            userId,
            productId,
            quantity,
        });

        console.log("UPDATE_ITEM_QUANTITY_API RESPONSE....", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        return response.data;
    } catch(err){
        console.log("Error while updating Item Quantity....", err);
        throw err;
    }
}


export async function clearCart(userId: string) {
    try{
        const response = await apiConnector('DELETE', `http://localhost:4000/api/v1/cart/clearCart`, {
            userId,
        });

        console.log("CLEAR_CART_API RESPONSE.....", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        return response.data;
    } catch(err){
        console.log("Error while clearing Cart...", err);
        throw err;
    }
}


export async function checkoutCart(userId: string) {
    try{
        const response = await apiConnector('POST', `http://localhost:4000/api/v1/cart/checkout`, {
            userId,
        });

        console.log("CHECKOUT_CART_API RESPONSE.....", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        return response.data;
    } catch(err){
        console.log("Error in checking out cart items.....", err);
        throw err;
    }
}