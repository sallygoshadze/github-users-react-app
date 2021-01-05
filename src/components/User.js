import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ image, name, id, type }) => {
    const url = 'https://api.github.com/users/';
    const [repos, setRepos] = React.useState([]);

    React.useEffect(() => {
        async function getRepos() {
            try {
                const response = await fetch(`${url}${name}/repos`);
                const data = await response.json();
                if (data) {
                    const threeRepos = data.slice(0, 3);
                    setRepos(threeRepos);
                } else {
                    setRepos(null);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getRepos();
    }, [name])

    return (
        <article className='user'>
            <div className='img-container'>
                <img src={image} alt={name} />
            </div>
            <div className='user-footer'>
                <Link to={`/${name}`} className='btn'>{name}</Link>

                <p >
                    <span className='person-data'>
                        type:
                    </span>
                    <span className='data-content'>{type}</span>
                </p>
                <div >
                    <span className='person-data'>
                        first 3 repo names:
                        </span>
                    <ul className='data-content'>{repos.map(item => <li key={item.id}>{item.name}</li>)}</ul>
                </div>
            </div>
        </article>
    )
}

export default User
