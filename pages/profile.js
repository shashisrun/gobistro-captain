import React from 'react';
import { useRouter } from 'next/router';
import { auth } from "../config/firebase";
import { useAuth } from '../contexts/authContext';
import ImageViewer from '../components/imageViewer';
import Link from 'next/link';
export default function Profile() {
    const [locaUserData, setLocalUserData] = React.useState({});
    const { user, setUser } = useAuth();
    const router = useRouter()
    React.useEffect(() => {
        if (user && user.profile) {
            setLocalUserData({ ...user.profile })
        }
    }, [user])

    const links = [
        {
            link: '/profile/notifications',
            title: 'Notifications',
            icon: '',
        },
        {
            link: '/profile/favourates',
            title: 'Favourates',
            icon: '',
        },
        {
            link: '/profile/orders',
            title: 'Order History',
            icon: '',
        },
        {
            link: '/profile/payments',
            title: 'Payment History',
            icon: '',
        }
    ]

    return (
        <>
            <div className='my-2 flex flex-row items-center'>
                <div className='w-1/3 p-2'>
                    <ImageViewer src={locaUserData.profilePhoto ? locaUserData.profilePhoto : 'https://picsum.photos/500'} width={500} height={500} className='rounded-full' />
                </div>
                <div className='w-2/3'>
                    <h1 className='text-3xl font-bold'>
                        {locaUserData.name}
                    </h1>
                    <h2 className='text-xl'>
                        {locaUserData.phone}
                    </h2>
                </div>

            </div>
            <div className="w-2/3 mx-auto rounded h-1 bg-secondary my-1"></div>
            <ul className='flex flex-col my-5'>
                {links.map((link, index) => {
                    return (
                        <li className='w-full h-12 my-2' key={index}>
                            <Link href={link.link}>
                                <div className='w-full h-full text-xl btn text-left'>
                                    {link.title}
                                </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <div className="w-2/3 mx-auto rounded h-1 bg-secondary my-1"></div>
            <button
                className='btn btn-primary w-full'
                onClick={() => {
                    auth.signOut()
                    router.reload(window.location.pathname)
                }}
            >signout</button>
        </>
    )
}