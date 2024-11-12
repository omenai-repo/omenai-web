import { getApiUrl, getBaseUrl } from "@shared/config";
import CredentialsProvider from "next-auth/providers/credentials";

type Input = {
  email: string;
  password: string;
};

type Credentials = Record<keyof Input, any>;

export const IndividualLoginProvider = CredentialsProvider<Credentials>({
  id: "individual-login",
  name: "Credentials",
  type: "credentials",
  credentials: {
    email: {},
    password: {},
  },
  authorize: async (credentials) => {
    const url = getBaseUrl();
    try {
      if (!credentials) throw new Error("Credentials Required");

      const response = await fetch(`${url}/api/auth/individual/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      return {
        id: data.id,
        user_id: data.id,
        verified: data.verified,
        email: data.email,
        name: data.name,
        preferences: data.preferences,
        role: data.role,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
});
