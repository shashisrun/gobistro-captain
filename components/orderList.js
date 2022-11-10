import React from 'react';
import OrderCard from "./orderCard"
import { where, documentId } from '../config/firebase';
import { useAuth } from '../contexts/authContext';
import { useDomain } from '../contexts/domainContext';
import { getDocuments } from '../config/firebase';

export default function OrderList({ orders }) {
    const [orderList, setOrderList] = React.useState([]);
    const { user } = useAuth();
    const { domain } = useDomain();
    React.useEffect(() => {
        if (user && domain && orders.length) {
            const mealIds = [];
            orders.map((order) => mealIds.push(order.product.id))
            const whereFavQuery = where(documentId(), "in", mealIds)
            getDocuments(`restaurants/${domain.domain}/foods`, whereFavQuery).then(async (data) => {
                const tables = await getDocuments(`/restaurants/${domain.domain}/tables`)
                const updatedOrders = [];
                for (let i = 0; i < orders.length; i++) {
                    const filteredOrder = {...orders[i]}
                    filteredOrder.product = data.filter((meal) => filteredOrder.product.id === meal.id)[0];
                    filteredOrder.tableData = tables.filter((table) => filteredOrder.table.id === table.id)[0];
                    filteredOrder.orderedBy = user.uid === filteredOrder.user.id ? 'You' : filteredOrder.userName;
                    updatedOrders.push(filteredOrder);
                }
                setOrderList(updatedOrders)
                console.log(updatedOrders)
            });
        }
    }, [user, domain, orders])
    return (
        <>
            {
                orderList.map((order) => {
                    return (
                        <>
                            <OrderCard order={order} />
                        </>
                    )
                })
                // JSON.stringify(orders)
            }
        </>
    )
}