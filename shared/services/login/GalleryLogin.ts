import { getApiUrl, getBaseUrl } from "@shared/config";
import CredentialsProvider from "next-auth/providers/credentials";
type Input = {
  email: string;
  password: string;
};

type Credentials = Record<keyof Input, any>;
export const GalleryLoginProvider = CredentialsProvider<Credentials>({
  id: "gallery-login",
  name: "Credentials",
  type: "credentials",
  credentials: {
    email: {},
    password: {},
  },

  authorize: async (credentials) => {
    const url = getBaseUrl();
    try {
      const response = await fetch(`${url}/api/auth/gallery/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      return {
        id: data.gallery_id,
        verified: data.verified,
        admin: data.admin,
        description: data.description,
        location: data.location,
        gallery_verified: data.gallery_verified,
        name: data.name,
        email: data.email,
        role: data.role,
        logo: data.logo,
        subscription_active: data.subscription_active,
        connected_account_id: data.connected_account_id,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
});
