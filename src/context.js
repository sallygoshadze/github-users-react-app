import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'


const url = 'https://api.github.com/search/users?q=followers:%3E1000'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [view, setView] = useState('listview');

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(url)
            const data = await response.json();
            const { items } = data;
            if (items) {
                const newUsers = items.map((item) => {
                    const { id, login, avatar_url, type } = item;
                    return { id: id, name: login, image: avatar_url, type: type }
                })
                setUsers(newUsers);
            } else {
                setUsers([]);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers])

    return (
        <AppContext.Provider
            value={{
                loading,
                users,
                view,
                setView
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }