import { useRouter } from "next/router";
import React from "react";
import ProductList from "../../components/productList";
import { getDocuments, where, createRef, getDocument } from "../../config/firebase";
import { useDomain } from "../../contexts/domainContext";

export default function Menu() {
    const [meals, setMeals] = React.useState([]);
    const [title, setTitle] = React.useState('');
    const { domain } = useDomain();
    const {query} = useRouter();
    React.useEffect(() => {
        if (domain && query.id) {
            getDocument(`restaurants/${domain.domain}/cuisines`, query.id).then((response) => {
                setTitle(response.name)
            });
            console.log(query.id);
            const ref = createRef(`restaurants/${domain.domain}/cuisines`, query.id)
            const whereFavQuery = where("cuisines", "array-contains", ref);
            getDocuments(`restaurants/${domain.domain}/foods`, whereFavQuery).then((data) => {
                console.log(ref);
                console.log(data);
                setMeals(data)
            });
        }
    }, [domain, query])
    return (
        <>
            <ProductList meals={meals} showCategory={false} initTitle={title} />
        </>
    )
}