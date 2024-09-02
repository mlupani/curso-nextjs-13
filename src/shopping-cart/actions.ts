import { getCookie, hasCookie, setCookie } from "cookies-next"


export const getShoppingCart = (): {[id: string]: number} => {
    if(hasCookie("shopping-cart")) {
        const cart = JSON.parse(getCookie("shopping-cart") as string) ?? "{}"
        return cart;
    }

    return {};
}


export const addProductToCart = (id: string) => {
    const cart = getShoppingCart();
    if(cart[id])
        cart[id] ++;
    else
        cart[id] = 1;

    setCookie("shopping-cart", JSON.stringify(cart));
}

export const deleteProductFromCart = (id: string) => {
    const cart = getShoppingCart();
    if(cart[id])
        delete cart[id];

    setCookie("shopping-cart", JSON.stringify(cart));
}

export const removeSingleItemFromCart = (id: string) => {
    const cart = getShoppingCart();
    if(cart[id] > 1)
        cart[id] --;
    else
        delete cart[id];

    setCookie("shopping-cart", JSON.stringify(cart));
}