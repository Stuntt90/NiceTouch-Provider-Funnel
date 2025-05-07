// src/app/actions/orders.ts
import { wixAppClient } from '@/app/utils/wix-sdk.app';
import { isTestingToken } from '@/app/utils/access-token';
import { orders as mockOrders } from '@/app/utils/mocks/orders';

export async function getLastOrders({ accessToken }: { accessToken: string }) {
  const sdk = wixAppClient;

  const response = isTestingToken(accessToken)
    ? await mockOrders.searchOrders()
    : await sdk.orders?.searchOrders({
        search: {
          cursorPaging: { limit: 3 },
        },
      });

  return response?.orders ?? [];
}