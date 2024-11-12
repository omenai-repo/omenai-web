import { AnimatePresence, motion } from "framer-motion";
import NotFoundData from "@shared/components/notFound/NotFoundData";
import { formatIntlDateTime } from "@shared/utils/formatIntlDateTime";
import OrdersCard from "./OrdersCard";

export default function CompletedOrders({ orders }: { orders: any }) {
  return (
    <AnimatePresence key={19}>
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -300 }}
        transition={{ duration: 0.33 }}
        className="w-full"
      >
        {orders.length === 0 ? (
          <NotFoundData />
        ) : (
          <div className="flex flex-col gap-3 w-full">
            {orders.map((order: any, index: number) => {
              return (
                <>
                  <OrdersCard
                    key={order.order_id}
                    url={order.artwork_data.url}
                    title={order.artwork_data.title}
                    artist={order.artwork_data.artist}
                    price={order.artwork_data.pricing.usd_price}
                    order_date={formatIntlDateTime(order.createdAt)}
                    status={order.status}
                    order_id={order.order_id}
                    state="history"
                    payment_information={order.payment_information}
                    tracking_information={order.tracking_information}
                    shipping_quote={order.shipping_quote}
                    delivery_confirmed={order.delivery_confirmed}
                    order_accepted={order.order_accepted}
                    availability={order.availability}
                  />
                  <hr className="h-px my-2 bg-dark/10 border-0 dark:bg-gray-700" />
                </>
              );
            })}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
