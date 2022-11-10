import React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import Offers from '../components/offers'
import Title from '../components/title'
import ProductList from '../components/productList'
import { useDomain } from '../contexts/domainContext';
import { getDocuments } from '../config/firebase';

export default function Home() {
  const [meals, setMeals] = React.useState([]);
  const { domain } = useDomain();
  React.useEffect(() => {
    if (domain) {
      getDocuments(`restaurants/${domain.domain}/foods`).then((data) => {
        setMeals(data);
      });
    }
  }, [domain])
  return (
    <>
      <Title>
        Hours are always happy ;)
      </Title>
      <Offers />
      <ProductList meals={meals} showCategory={true} initTitle={'Popular Here'} />
    </>
  )
}
