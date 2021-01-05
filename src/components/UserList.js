import React from 'react'
import User from './User'
import Loading from './Loading'
import { useGlobalContext } from '../context'

const UserList = () => {
    const { view, setView, users, loading } = useGlobalContext();

    if (loading) {
        return <Loading />
    }

    if (users.length < 1) {
        return (
            <h2 className='section-title'>
                no users matched
            </h2>
        )
    }

    const handleToggle = () => {
        console.log(view);
        if (view === 'listview') {
            setView('gridview');
        }
        else if (view === 'gridview') {
            setView('listview')
        }
    }

    return (
        <section className='section'>
            <div className='section-title'>
                <h2>Most Popular Users of GitHub</h2>
                <p className='btn toggle' onClick={handleToggle}>switch view</p>
            </div>
            <div className={`users-center ${view}`}>
                {users.map((item) => {
                    return <User key={item.id} {...item} />
                })}
            </div>
        </section>
    )
}

export default UserList;
