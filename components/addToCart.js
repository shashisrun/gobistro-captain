import React from 'react';
import { useDomain } from '../contexts/domainContext';
import { useAuth } from '../contexts/authContext';
import { addNamedDocument, serverTimestamp, deleteDocument, createRef } from '../config/firebase';
export default function AddToCart({ product, addToCart }) {
    const [isInCart, setIsInCart] = React.useState(false);
    const [quantity, setQuantity] = React.useState(0);
    const { domain } = useDomain();
    const { user, setUser } = useAuth();


    const updateUserContext = (updatedQuantity) => {
        const cart = [...user.profile.cart]
        let productIncart = false;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === product.id) {
                if (updatedQuantity) {
                    cart[i].quantity = updatedQuantity;
                } else {
                    cart.splice(i, 1)
                }
                productIncart = true;
            }
        }
        if (!productIncart) cart.push({id: product.id, quantity: updatedQuantity})
        setUser({...user, profile: {...user.profile, cart: cart}});
    }

    const incrementItem = () => {
        if (domain && user && user.profile && user.profile.cart) {
            if (!quantity) {
                console.log(`/restaurants/${domain.domain}/foods`);
                addNamedDocument(`users/${user.uid}/restaurants/${domain.domain}/cart`,
                    {
                        quantity: quantity + 1,
                        product: createRef(`/restaurants/${domain.domain}/foods`, product.id),
                        createdAt: serverTimestamp()
                    },
                    product.id
                ).then((response) => {
                    if (response) {
                        setQuantity(quantity + 1);
                        updateUserContext(quantity + 1)
                    }
                });
            } else {
                const productInCart = user.profile.cart.filter((item) => item.id === product.id);
                console.log(productInCart);
                if (productInCart.length) {
                    addNamedDocument(`users/${user.uid}/restaurants/${domain.domain}/cart`,
                        {
                            quantity: quantity + 1,
                        },
                        product.id
                    ).then(() => {
                        setQuantity(quantity + 1);
                        updateUserContext(quantity + 1)
                    });
                }
            }
        }
    }
    const decrementItem = () => {
        if (quantity > 1) {
            const productInCart = user.profile.cart.filter((item) => item.id === product.id);
            console.log(productInCart);
            if (productInCart.length) {
                addNamedDocument(`users/${user.uid}/restaurants/${domain.domain}/cart`,
                    {
                        quantity: quantity - 1,
                    },
                    product.id
                ).then(() => {
                    setQuantity(quantity - 1);
                    updateUserContext(quantity - 1)
                });
            }
        } else {
            deleteDocument(`users/${user.uid}/restaurants/${domain.domain}/cart`, product.id).then((response) => {
                setQuantity(0);
                updateUserContext(0)
            })
        }
    }

    React.useEffect(() => {
        if (domain && user && user.profile && user.profile.cart) {
            const cart = [...user.profile.cart]
            const productInCart = cart.filter((item) => item.id === product.id);
            if (productInCart.length) {
                setQuantity(productInCart[0].quantity);
            }
            if (quantity) {
                setIsInCart(true);
            } else {
                setIsInCart(false);
            }
        }
    }, [quantity, user, domain, product]);

    return (
        <>
            <div className="my-3 mx-3">
                {!isInCart ?
                    <>
                        <button className='btn btn-primary w-full' onClick={incrementItem}>
                            {addToCart ? addToCart : 'Add To Cart'} (₹{product.price})
                        </button>
                    </>
                    :
                    <>
                        <div className='w-full'>
                            <div className='text-xl font-bold text-center w-full py-2 my-2'>Total: ₹{quantity * product.price}</div>
                            <div className='flex flex-row items-center gap-2 w-full'>
                                <button className='btn w-2/6 text-3xl font-bold' onClick={decrementItem}>
                                    -
                                </button>
                                <span className='text-3xl font-bold w-4/6 text-center'>
                                    { quantity }
                                </span>
                                <button className='btn btn-primary w-2/6 text-3xl font-bold' onClick={incrementItem}>
                                    +
                                </button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}