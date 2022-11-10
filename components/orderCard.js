import ProductCard from "./productCard"
import moment from 'moment';

export default function OrderCard({ order }) {
    return (
        <>
            <div className="card w-full my-5 ">
                <div className="card-body">
                    <h2 className="card-title">Order Id: {order.orderId}</h2>
                    <p className="text-l">
                        Status: {!order.isApproved
                            ? 'Waiting Approval'
                            : !order.isDelivered
                                ? 'Preparing Order'
                                : !order.isBilled
                                    ? 'Order Served and is unpaid'
                                    : 'Payment Complete'}
                    </p>
                    <p className="text-l">
                        Ordered by: {order.orderedBy}, {moment(order.createdAt.toDate()).fromNow()}
                    </p>
                    <p className="text-l">
                        Quantity: {order.quantity}
                    </p>
                    {order.tableData ?
                        <p className="text-l">
                            Order Table: {order.tableData.table}
                        </p>
                    : <></>}
                    <div className="w-full">
                        <ProductCard product={order.product} compact={true} addToCart={'Reorder'} noDivider={true} />
                    </div>
                </div>
            </div>
            <div className="w-2/3 mx-auto rounded h-1 bg-secondary my-1"></div>
        </>
    )
}