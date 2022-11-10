import React from 'react';

const DomainContext = React.createContext();

export const useDomain = () => React.useContext(DomainContext);

export function DomainProvider({ children }) {
    const [domain, setDomain] = React.useState();

    React.useEffect(() => {
        setDomain(JSON.parse(sessionStorage.getItem('domainContext')))
    }, [])

    return (
        <>
            <DomainContext.Provider value={{ domain, setDomain }}>{children}</DomainContext.Provider>
        </>
    );
}