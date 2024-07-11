import { generateDigit } from "@/utils/generateToken";
import mongoose, { Schema } from "mongoose";

const transactions = new Schema<TransactionModelSchemaTypes>(
  {
    trans_id: { type: String, default: () => `PAY_OM_${generateDigit(7)}` },
    trans_reference: { type: String, required: true },
    trans_amount: { type: String, required: true },
    trans_date: { type: Date, required: true },
    trans_owner_id: { type: String, required: true },
    trans_owner_role: { type: String, required: true },
    trans_gallery_id: { type: String, required: true },
    trans_type: { type: String, required: true },
  },
  { timestamps: true }
);

export const Transactions =
  mongoose.models.Transactions || mongoose.model("Transactions", transactions);
