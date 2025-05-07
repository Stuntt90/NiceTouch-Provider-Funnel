// src/app/utils/mocks/orders.ts
export const orders = {
  searchOrders: async () => {
    return {
      orders: [
        {
          number: '123',
          _createdDate: new Date().toISOString(),
          priceSummary: {
            total: { amount: 50 },
          },
          currency: 'USD',
        },
      ],
    };
  },
};
