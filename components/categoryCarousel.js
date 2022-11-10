import React from 'react';
import { IoFilter } from 'react-icons/io5'
import { getDocuments } from '../config/firebase';
import { useDomain } from '../contexts/domainContext';

export default function CategoryCarousel({ onClick }) {
    const [cuisines, setCuisines] = React.useState([]);
    const { domain } = useDomain();

    React.useEffect(() => {
        if (domain) {
            getDocuments(`restaurants/${domain.domain}/cuisines`).then((data) => {
                setCuisines(data);
            });
        }
    }, [domain])

    return (
        <div className="flex flex-row flex-nowrap overflow-x-scroll py-2 sticky top-16 bg-base-100 z-40">
            <div className='my-1 mx-2'>
                <button className="btn btn-default py-1 bg-secondary hover:bg-primary flex flex-row" onClick={() => onClick()}>
                    <span className='mx-1'>All</span>
                </button>
            </div>
            {cuisines.map((cuisine, key) => {
                return (
                    <div className='my-1 mx-2' key={key}>
                        <button className="btn btn-default py-1 bg-secondary hover:bg-primary flex flex-row"
                            onClick={() => onClick(cuisine)}
                        >
                            <span className='mx-1'>{cuisine.name}</span>
                        </button>
                    </div>
                )
            })}
            <div className='my-1 mx-2 sticky right-0'>
                <label htmlFor="filterModal" className="btn btn-default py-1 bg-secondary hover:bg-primary flex flex-row">
                    <IoFilter size={24} />
                </label>
                <input type="checkbox" id="filterModal" className="modal-toggle z-50" />
                <div className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
                        <p className="py-4">You&apos;ve been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                        <div className="modal-action">
                            <label htmlFor="filterModal" className="btn">Yay!</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}