import { Client, Storage } from "appwrite";
const client = new Client();
const endpoint = "https://cloud.appwrite.io/v1";

client
  .setEndpoint(endpoint)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_CLIENT_ID!);

export const storage = new Storage(client);

// Promotional content

const promotional_client = new Client();

promotional_client
  .setEndpoint(endpoint)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROMOTIONAL_CLIENT_ID!);

export const promotional_storage = new Storage(promotional_client);

// Gallery logo upload

const gallery_logo_client = new Client();

gallery_logo_client
  .setEndpoint(endpoint)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_GALLERY_LOGO_CLIENT_ID!);

export const gallery_logo_storage = new Storage(gallery_logo_client);
