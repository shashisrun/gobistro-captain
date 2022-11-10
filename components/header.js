
import React from 'react';
import { IoRepeatOutline } from 'react-icons/io5';
import Table from './header/table';

export default function Header() {
    const [darkMode, setDarkMode] = React.useState(true);
    const [suugestions, setSuggestions] = React.useState(false);
    const [search, setSearch] = React.useState('');

    const previousSearchers = [
        'Hakka Noodles',
        'Aaloo Paratha, Aaloo Paratha, Aaloo Paratha',
        'Old Monk',
    ]
    const lastOrder = 'xyz'
    const RepeatLastOrder = () => {
        if (lastOrder) return (
            <button className='flex flex-row align-items-center justify-items-center font-bold text-xl' onClick={() => {
                console.log('RepeatLastOrder')
                setSuggestions(false)
            }}>
                <IoRepeatOutline size={28} />
                <span className='mx-1'>Repeat your last order</span>
            </button>
        )

        return <></>
    }
    const SuggestionBox = () => {
        if (suugestions) return (
            <div className='flex flex-col px-8 py-5 relative'>
                <button className='absolute top-2 right-5 font-bold text-xl' onClick={() => setSuggestions(false)}>X</button>
                <RepeatLastOrder />
                <h2 className='text-l font-bold mt-2 mb-1'>Recent Searches</h2>
                <RecentSearches />
            </div>
        )
        return <></>
    }

    const RecentSearches = () => {
        if (previousSearchers.length) return (
            <>
                {previousSearchers.map((previousSearch, key) => {
                    return (
                        <button className='text-left mb-2 py-1 border-b border-secondary' key={key} onClick={() => {
                            setSearch(previousSearch)
                            setSuggestions(false)
                        }}>
                            {previousSearch}
                        </button>
                    )
                })}
            </>
        )
        return <></>
    }
    return (
        <header className="px-2 py-3 w-full sticky top-0 bg-base-200 flex-none h-18 z-50">
            <div className="flex flex-row">
                <div className="w-2/12">
                    <Table />
                </div>
                <div className="w-8/12 px-2">
                    <input type="text" placeholder="Search" className="input rounded-full input-bordered w-full max-w-xs" value={search} onChange={(event) => setSearch(event.target.value)} onFocus={() => {
                        setSuggestions(true)
                        }}
                        onBlur={() => {
                        }}
                    />
                </div>
                <div className="w-2/12">
                    <label className="swap swap-rotate btn bg-transparent hover:bg-transparent">
                        <input type="checkbox" checked={darkMode ? 'checked' : ''} onChange={() => {
                            const html = document.getElementsByTagName('html')[0];
                            html.setAttribute('data-theme', `${!darkMode ? 'darktheme' : 'lighttheme'}`);
                            setDarkMode(!darkMode);
                        }} />
                        <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
                        <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
                    </label>
                </div>
            </div>
            <SuggestionBox />
        </header>
    )
}