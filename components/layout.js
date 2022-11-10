import React from 'react';
import { useRouter } from "next/router";
import Footer from "./footer";
import Header from "./header";
import { useAuth } from "../contexts/authContext";
import { unauthenticatedRoutes } from '../config/routes';
import { useDomain } from '../contexts/domainContext';
import { FcBrokenLink } from 'react-icons/fc'

export default function Layout({ children }) {
    const { user } = useAuth();
    const router = useRouter();
    const { domain, setDomain } = useDomain();
    
    React.useEffect(() => {
        if (router.query.domain || domain) {
            const domainConetxt = {
                domain: router.query.domain,
                table: router.query.table
            }
            if (!domain || (domainConetxt.domain && (domainConetxt.domain !== domain.domain || domainConetxt.table !== domain.table))) {
                setDomain(domainConetxt);
                sessionStorage.setItem('domainContext', JSON.stringify(domainConetxt))
            }
            if (!user && !unauthenticatedRoutes.includes(router.pathname)) {
                router.push({
                    pathname: '/signin',
                    query: {
                        ...router.query,
                        forwardTo: router.pathname
                    }
                })
            } else if (user && unauthenticatedRoutes.includes(router.pathname)) {
                router.push({
                    pathname: router.query.forwardTo,
                    query: {
                        ...router.query,
                    }
                })
            }
        }
    }, [user,router, setDomain, domain]);

    return (
        <>
            {domain ? 
                <div className="flex flex-col">
                    {user ? <Header /> : null}
                    <main className="px-2 min-h-screen">
                        {children}
                    </main>
                    {user ? <Footer /> : null}
                </div>
                :
                <>
                    <div className="px-2 flex flex-col items-center text-center my-64">
                        <FcBrokenLink size={128} />
                        <h1 className='text-xl'>
                            You have not scanned any QR Code, Please visit this url by scanning a QR Code at your nearest restaurant, hotel, pub or club
                        </h1>
                    </div>
                </>
            }
        </>
    )
}