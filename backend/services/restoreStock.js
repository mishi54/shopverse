export const restoreStock = async (items, session = null) => {

  for (const item of items) {

    await Product.updateOne(
      { _id: item.product },
      {
        $inc: { stock: item.quantity }
      },
      { session }
    );

  }

};