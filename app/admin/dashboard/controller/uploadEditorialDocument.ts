import { editorial_database } from "@/appwrite";
import { ID } from "appwrite";

const uploadEditorialDocument = async (data: EditorialSchemaTypes) => {
    const documentUploaded = await editorial_database.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_EDITORIAL_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_EDITORIAL_COLLECTION_ID!,
        ID.unique(),
        data
    );

    return documentUploaded
};

export default uploadEditorialDocument;

