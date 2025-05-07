export const orders = {
  async searchOrders() {
    return {
      orders: [
        {
          id: 'mock-1',
          createdDate: new Date().toISOString(),
          total: 49.99,
        },
        {
          id: 'mock-2',
          createdDate: new Date().toISOString(),
          total: 79.99,
        }
      ]
    };
  }
};

