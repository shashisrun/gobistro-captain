import React from 'react';
import OrderList from '../components/orderList'
import { useDomain } from '../contexts/domainContext';
import { useAuth } from '../contexts/authContext';
import { getDocuments, where } from '../config/firebase';

export default function Orders() {
    const [orders, setOrders] = React.useState([]);
    const { domain } = useDomain();
    const { user } = useAuth();
    React.useEffect(() => {
        if (domain && user) {
            const whereFavQuery = where('isBilled', "==", false)
            getDocuments(`users/${user.uid}/restaurants/${domain.domain}/orders`, whereFavQuery).then((data) => {
                setOrders(data);
            });
        }
    }, [domain, user])
    return (
        <>
            <OrderList orders={orders} />
        </>
    )
}