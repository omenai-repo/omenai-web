import { AnimatePresence, motion } from "framer-motion";
import { ObjectId } from "mongoose";
import OrdersTable from "./OrdersTable";
import NotFoundData from "@shared/components/notFound/NotFoundData";

export default function ProcessingOrders({
  orders,
}: {
  orders: CreateOrderModelTypes[] & {
    createdAt: string;
    updatedAt: string;
    _id: ObjectId;
  };
}) {
  return (
    <AnimatePresence key={16}>
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -300 }}
        transition={{ duration: 0.33 }}
        className="w-full"
      >
        {orders.length === 0 ? <NotFoundData /> : <OrdersTable data={orders} />}
      </motion.div>
    </AnimatePresence>
  );
}
