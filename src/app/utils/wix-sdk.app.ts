import { createClient, type Host } from '@wix/sdk';
import { AppStrategy } from '@wix/sdk/auth/wix-app-oauth';
import { orders } from '../utils/mocks/orders'; // update the path if needed

type MyClientModules = {
  orders: typeof orders;
};

export const wixAppClient = createClient<Host<MyClientModules>>({
  auth: AppStrategy({
    appId: process.env.WIX_APP_ID!,
    appSecret: process.env.WIX_APP_SECRET!,
    publicKey: process.env.WIX_APP_JWT_KEY!,
  }),
  modules: {
    orders,
  },
});
