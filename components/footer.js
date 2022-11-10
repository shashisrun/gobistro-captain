import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoBeerOutline, IoBookOutline, IoCartOutline, IoReaderOutline, IoPersonCircleOutline, IoBeer, IoBook, IoCart, IoReader, IoPersonCircle } from 'react-icons/io5'

export default function Footer() {
    const router = useRouter()
    const links = [
        {
            title: 'Tables',
            url: '/',
            icon: <IoBeerOutline size={28} />,
            activeicon: <IoBeer size={28} />
        },
        {
            title: 'Orders',
            url: '/orders',
            icon: <IoBookOutline size={28} />,
            activeicon: <IoBook size={28} />
        },
        {
            title: 'Profile',
            url: '/profile',
            icon: <IoPersonCircleOutline size={28} />,
            activeicon: <IoPersonCircle size={28} />
        },
    ]
    return (
        <footer className='sticky bottom-0 w-full bg-primary rounded-t-3xl flex-none h-30 z-50'>
            <nav className='text-center'>
                <ul className='px-2 py-1 flex flex-row'>
                    {links.map((link, key) => {
                        return (
                            <li key={key} className={`w-1/3 ${router.pathname === link.url ? 'text-secondary font-bold' : 'text-primary-content'}`}>
                                <Link href={link.url}>
                                    <a className='grid justify-items-center px-2 py-3 '>
                                        {router.pathname === link.url ? link.activeicon : link.icon}
                                        <h2>{link.title}</h2>
                                    </a>
                                </Link>
                            </li>
                        )
                    })}
                </ul> 
            </nav>
        </footer>
    )
}