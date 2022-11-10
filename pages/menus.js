import React from 'react';
import Title from '../components/title'
import CategoryCard from '../components/categoryCard'
import { useDomain } from '../contexts/domainContext';
import { getDocuments } from '../config/firebase';

export default function Menus() {
    const [categories, setCategories] = React.useState([]);
    const { domain } = useDomain();
    React.useEffect(() => {
        if (domain) {
            getDocuments(`restaurants/${domain.domain}/cuisines`).then((data) => {
                setCategories(data);
            });
        }
    }, [domain])
    return (
        <div>
            <Title>
                Menu!
            </Title>
            <div>
                {categories.map((category, index) => <CategoryCard category={category} key={index} />)}
            </div>
        </div>
    )
}