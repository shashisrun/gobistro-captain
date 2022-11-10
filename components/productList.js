import React from 'react';
import { getDocuments, where } from '../config/firebase';
import ProductCard from './productCard';
import CategoryCarousel from './categoryCarousel';
import { useAuth } from '../contexts/authContext';
import { useDomain } from '../contexts/domainContext';

export default function ProductList({ meals, showCategory, initTitle, compact }) {
    const [filteredMeals, setFilteredMeals] = React.useState([]);
    const [filters, setFilters] = React.useState([]);
    const [title, setTitle] = React.useState();
    const { user, setUser } = useAuth();
    const { domain } = useDomain();

    React.useEffect(() => {
        if (user && user.profile && domain) {
            setTitle(initTitle);
            const whereFavQuery = where("isFavourate", "==", true)
            let favourates;
            let cart;
            getDocuments(`users/${user.uid}/restaurants/${domain.domain}/favourates`, whereFavQuery).then((data) => {
                favourates = data ? data : [];
                const profile = { ...user.profile };
                if (favourates) profile.favourates = [...favourates]
                if (cart) profile.cart = [...cart]
                const updatedUser = { ...user, profile: profile };
                setUser(updatedUser);
            });
            
            getDocuments(`users/${user.uid}/restaurants/${domain.domain}/cart`).then((data) => {
                cart = data ? data : [];
                const profile = { ...user.profile };
                if (favourates) profile.favourates = [...favourates]
                if (cart) profile.cart = [...cart]
                const updatedUser = { ...user, profile: profile };
                setUser(updatedUser);
            });

        }
    }, [domain, initTitle])

    return (
        <div className='my-5'>
            {showCategory ?
                <CategoryCarousel onClick={(data) => {
                    if (data) {
                        const mealsCopy = [ ...meals ];
                        const localFilteredMeals = mealsCopy.filter(meal => {
                            for (let i = 0; i < meal.cuisines.length; i++) {
                                if(meal.cuisines[i].id == data.id) return meal;
                            }
                        })
                        setTitle(data.name);
                        setFilteredMeals(localFilteredMeals);
                    } else {
                        setTitle('All Meals');
                        setFilteredMeals([])
                    }
                }} />
                : <></>
            }
            <h2 className='text-3xl font-bold'>
                {title}
            </h2>
            {filteredMeals.length ?
                <>
                    {filteredMeals.map((meal, key) => {
                        return (
                            <ProductCard product={meal} key={key} />
                        )
                    })}
                </>
            :
                <>
                    {meals.map((meal, key) => {
                        return (
                            <ProductCard product={meal} key={key} compact={compact} />
                        )
                    })}
                </>    
        }
        </div>
    )
}