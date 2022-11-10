import React from 'react';
import ProductList from '../components/productList'
import { useDomain } from '../contexts/domainContext';
import { useAuth } from '../contexts/authContext';
import { getDocuments, where, documentId, addDocument, addNamedDocument, deleteDocument, createRef } from '../config/firebase';
import randomNumber from '../utilities/randomNumber';
import { useRouter } from 'next/router';

export default function Cart() {
    const [meals, setMeals] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const { domain } = useDomain();
    const { user, setUser } = useAuth();
    const router = useRouter();
    React.useEffect(() => {
        if (domain && user && user.profile && user.profile.cart) {
            const cartItems = [];
            for (let i = 0; i < user.profile.cart.length; i++) {
                cartItems.push(user.profile.cart[i].id);
            }
            if (cartItems.length) {
                const whereFavQuery = where(documentId(), "in", cartItems)
                getDocuments(`restaurants/${domain.domain}/foods`, whereFavQuery).then((data) => {
                    setMeals(data);
                    let localTotal = 0;
                    for (let i = 0; i < data.length; i++) {
                        const item = user.profile.cart.filter(item => item.id === data[i].id)[0]
                        localTotal = localTotal + parseInt(data[i].price) * parseInt(item.quantity)
                    }
                    setTotal(localTotal)
                    console.log(localTotal);
                });
            }
        }
    }, [domain, user])
    return (
        <>
            <ProductList meals={meals} showCategory={false} initTitle={'In Your Cart'} compact={true} />
            {total ?
                <>
                    <div className='w-full sticky bottom-24 left-0'>
                        <button className='w-full btn btn-primary'
                            onClick={async () => {
                                const cartItems = await getDocuments(`users/${user.uid}/restaurants/${domain.domain}/cart`)
                                let orderedItems = 0;
                                for (let i = 0; i < cartItems.length; i++) {
                                    const { id, createdAt, updatedAt, ...requestData} = cartItems[i]
                                    requestData.table = createRef(`/restaurants/${domain.domain}/tables`, domain.table)
                                    requestData.user = createRef('users', user.uid);
                                    requestData.userPhone = user.phoneNumber;
                                    requestData.userName = user.profile.name;
                                    requestData.orderId = randomNumber(6);
                                    requestData.isApproved = false;
                                    requestData.isDelivered = false;
                                    requestData.isBilled = false;
                                    addDocument(`restaurants/${domain.domain}/orders`, requestData).then((orderData) => {
                                        const { id, updatedAt, ...userOrder } = orderData
                                        addNamedDocument(`users/${user.uid}/restaurants/${domain.domain}/orders`, userOrder, orderData.id).then(() => {
                                            deleteDocument(`users/${user.uid}/restaurants/${domain.domain}/cart`, cartItems[i].id).then(async () => {
                                                orderedItems = orderedItems + 1;
                                                if (orderedItems === cartItems.length) {
                                                    const updatedCart = await getDocuments(`users/${user.uid}/restaurants/${domain.domain}/cart`);
                                                    setUser({ ...user, profile: { ...user.profile, cart: [...updatedCart] } })
                                                    router.push('/orders')
                                                }
                                            })
                                        })
                                    })
                                }
                            }}
                        >Place Order (₹{ total })</button>
                    </div>
                </>
                :<></>
            }
        </>
    )
}