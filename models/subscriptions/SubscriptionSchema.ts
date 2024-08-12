import mongoose, { Schema } from "mongoose";

const subscriptions = new Schema<SubscriptionModelSchemaTypes>(
  {
    start_date: { type: Date, required: true },
    expiry_date: { type: Date, required: true },
    payment: { type: Schema.Types.Mixed, required: true },
    card: { type: Schema.Types.Mixed, required: true },
    customer: { type: String, required: true },
    status: { type: String, required: true },
  },

  { timestamps: true }
);

export const Subscriptions =
  mongoose.models.Subscriptions ||
  mongoose.model("Subscriptions", subscriptions);
