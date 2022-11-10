import React from 'react';
import { TbArmchair2 } from 'react-icons/tb';
import { getDocument, updateDocument } from '../../config/firebase';
import { useDomain } from '../../contexts/domainContext';
import { useRestaurant } from '../../contexts/restaurantContext';

export default function Table() {
    const [table, setTable ] = React.useState({})
    const [ring, setRing ] = React.useState(false)
    const { domain } = useDomain();
    const { restaurant } = useRestaurant();

    const callCaptain = () => {
        updateDocument(`restaurants/${domain.domain}/tables/`, {
            isCalling: !ring,
        }, domain.table).then((data) => {
            if (data) setRing(!ring)
        })
    }

    React.useEffect(() => {
        if (domain && domain.table) {
            getDocument(`restaurants/${domain.domain}/tables/`, domain.table).then((data) => {
                setTable(data)
                setRing(data.isCalling)
            })
        }
    }, [domain])

    return (
        <>
            <label htmlFor="choose-table-modal" className="btn bg-primary modal-button">
                {table ? table.table : <TbArmchair2 size={24} />}
            </label>
            <input type="checkbox" id="choose-table-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box z-50">
                    {domain && domain.table ?
                        <>
                            <h3 className="font-bold text-lg">Welcome to, {restaurant.name}</h3>
                            <p className="py-4">Your orders are getting placed for table {table.table}</p>
                            <div className="modal-action">
                                <button className='btn btn-primary' onClick={() => {
                                    callCaptain()
                                }}>
                                    {ring ? 'Call Captain' : 'Stop Calling'}
                                </button>
                                <label htmlFor="choose-table-modal" className="btn">Close</label>
                            </div>
                        </>
                        :
                        <>
                            <h3 className="font-bold text-lg">Sorry!</h3>
                            <p className="py-4">You have not scanned any menu yet, please scan one to use the app!</p>
                            <div className="modal-action">
                                <label htmlFor="choose-table-modal" className="btn">Close</label>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}