import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import { ApiError } from "../util/apiError.js";
export const addToCartService = async (userId, productId, quantity) => {

    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
        cart = await Cart.create({
            user: userId,
            items: [
                {
                    product: productId,
                    quantity: quantity || 1
                }
            ]
        });
        return cart;
    }
    const existingItem = cart.items.find(
        item => item.product.toString() === productId
    );

    if (existingItem) {
        existingItem.quantity += quantity || 1;
    } else {
        cart.items.push({
            product: productId,
            quantity: quantity || 1
        });
    }

    await cart.save();
    return cart;
};

export const getMyCartService = async (userId) => {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }
    return cart;
};
 
export const updateCartItemService = async (userId, productId, quantity) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }
    const item = cart.items.find(i => i.product.toString() === productId);
    if (!item) {
        throw new ApiError(404, "Item not found in cart");
    }
        if (quantity <= 0) {
        cart.items = cart.items.filter(
            (p) => p.product.toString() !== productId
        );
    } else {
        item.quantity = quantity;
    }
    await cart.save();
    return cart;
};

export const clearCartService = async (userId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }
    cart.items = [];
    await cart.save();
    return cart;
};


export const removeCartItemService = (async (userId, productId) => {


    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    const item = cart.items.find(
        (p) => p.product.toString() === productId
    );

    if (!item) {
        throw new ApiError(404, "Item not found in cart");
    }

    // decrease logic
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart.items = cart.items.filter(
            (p) => p.product.toString() !== productId
        );
    }

    await cart.save();

    return cart;
});