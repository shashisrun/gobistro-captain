import React from 'react';
import { getDocument } from '../config/firebase';
import { useDomain } from './domainContext';
const RestaurantContext = React.createContext();

export const useRestaurant = () => React.useContext(RestaurantContext);

export function RestaurantProvider({ children }) {
    const [restaurant, setRestaurant] = React.useState();
    const { domain } = useDomain();

    React.useEffect(() => {
        if (domain && domain.domain) {
            getDocument('restaurants', domain.domain).then((data) => setRestaurant(data))
        }
    }, [domain])

    return (
        <>
            <RestaurantContext.Provider value={{ restaurant }}>{children}</RestaurantContext.Provider>
        </>
    );
}