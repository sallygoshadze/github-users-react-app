import React from 'react'
import UserList from '../components/UserList'
import SearchForm from '../components/SearchForm'

const Home = () => {
  return (
    <main>
      <SearchForm />
      <UserList />
      
    </main>
  )
}

export default Home