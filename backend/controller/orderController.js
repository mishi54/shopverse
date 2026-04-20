import { cancelOrderService, createCheckoutSessionService, getAllOrdersService, getMyOrdersService, getOrderByIdService, updateOrderStatusService } from "../services/orderService.js";
import {asyncHandler} from "../util/asyncHandler.js";
import { ApiResponse } from "../util/apiResponse.js";
import { ApiError } from "../util/apiError.js";
import validator from "../util/validator.js";
import { orderSchema } from "../schema/orderSchema.js";
// import { markAsPaidService } from "../services/orderService.js";
export const createCheckoutSession = asyncHandler(async (req, res) => {
  const userId = req.user._id;
    const error=await validator(orderSchema,req.body);
    if(error){
        throw new ApiError(400,error);
    }
  const { shippingAddress, paymentMethod } = req.body;

  const order = await createCheckoutSessionService(
    userId,
    shippingAddress,
    paymentMethod
  );

  res
    .status(201)
    .json(new ApiResponse(201, order, "Order placed successfully"));
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const orders = await getMyOrdersService(userId);

  res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully"));
});

export const getOrderById = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { orderId } = req.params;

  const order = await getOrderByIdService(userId, orderId);

  res
    .status(200)
    .json(new ApiResponse(200, order, "Order fetched successfully"));
});

export const getAllOrders = asyncHandler(async (req, res) => {

  const orders = await getAllOrdersService();

  res
    .status(200)
    .json(new ApiResponse(200, orders, "All orders fetched successfully"));

});

export const updateOrderStatus = asyncHandler(async (req, res) => {

  const { orderId } = req.params;
  const { status } = req.body;

  const order = await updateOrderStatusService(orderId, status);

  res.status(200).json(
    new ApiResponse(200, order, "Order status updated successfully")
  );
});

export const cancelOrder = asyncHandler(async (req, res) => {

  const userId = req.user.id;
  const { orderId } = req.params;

  const order = await cancelOrderService(userId, orderId);

  res.status(200).json(
    new ApiResponse(200, order, "Order cancelled successfully")
  );
});


// export const markAsPaid = asyncHandler(async (req, res) => {

//   const { orderId } = req.params;
//   const { transactionId } = req.body;

//   const order = await markAsPaidService(orderId, transactionId);

//   res.status(200).json(
//     new ApiResponse(200, order, "Order marked as paid")
//   );
// });