// src/app/utils/wix-sdk.app.ts
import { createClient } from '@wix/sdk';
import { AppStrategy } from '@wix/sdk/auth/wix-app-oauth';

export const wixAppClient = createClient({
  auth: AppStrategy({
    appId: process.env.WIX_APP_ID!,
    appSecret: process.env.WIX_APP_SECRET!,
    publicKey: process.env.WIX_APP_JWT_KEY!,
  }),
});
