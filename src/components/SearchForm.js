import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const SearchForm = () => {
    const searchValue = React.useRef('');
    const [searchTerm, setSearchTerm] = React.useState('');
    const searchUser = () => {
        setSearchTerm(searchValue.current.value);
    }

    const searchItems = JSON.parse(localStorage.getItem('searchItems')) ? JSON.parse(localStorage.getItem('searchItems')) : []

    const updateSearch = () => {
        if (searchItems.length > 2) {
            searchItems.pop();
        }

        searchItems.unshift(searchTerm);
        localStorage.setItem('searchItems', JSON.stringify(searchItems))
    }

    return (
        <section className='section search'>
            <div className='search-form'>
                <div className='form-control'>
                    <label htmlFor='name'>search GitHub User</label>
                    <input type='text' id='name' ref={searchValue} onChange={searchUser} placeholder={searchItems} />
                    <Link to={`/${searchTerm}`} className='btn-container' onClick={updateSearch}>
                        <FaSearch className='search-btn' />
                    </Link>
                </div>
            </div>
        </section>
    )
}


export default SearchForm;