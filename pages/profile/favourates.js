import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { where, documentId } from '../../config/firebase';
import { useAuth } from '../../contexts/authContext';
import { useDomain } from '../../contexts/domainContext';
import { getDocuments } from '../../config/firebase';
import ProductList from '../../components/productList';

export default function Favourates() {
    const [meals, setMeals] = React.useState([]);
    const { user } = useAuth();
    const { domain } = useDomain();
    React.useEffect(() => {
        if (user && domain) {
            const whereFavQuery = where("isFavourate", "==", true)
            getDocuments(`users/${user.uid}/restaurants/${domain.domain}/favourates`, whereFavQuery).then((data) => {
                const mealQueryArray = [];
                for (let i = 0; i < data.length; i++) {
                    mealQueryArray.push(data[i].id);
                }
                if (mealQueryArray.length) {
                    const mealFavQuery = where(documentId(), "in", mealQueryArray)
                    getDocuments(`restaurants/${domain.domain}/foods`, mealFavQuery).then((data) => {
                        setMeals(data);
                    });
                }
            });
        }
    }, [user, domain])
    return (
        <div>
            <ProductList meals={meals} showCategory={false} initTitle={'Favourates'} />
        </div>
    )
}
