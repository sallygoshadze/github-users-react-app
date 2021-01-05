import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
import Error from '../components/Error'
const url = 'https://api.github.com/users/'

const SingleUser = () => {
    const { name } = useParams();
    const [loading, setLoading] = React.useState(false);
    const [users, setUsers] = React.useState(null);
    const [repos, setRepos] = React.useState([]);
    const [orgs, setOrgs] = React.useState('initial');


    const orgsUrl = `${url}${name}/orgs`;
    //fetch organizations
    React.useEffect(() => {
        async function getOrgs() {
            try {
                const response = await fetch(orgsUrl);
                const data = await response.json();
                if (data) {
                    const newOrgs = data.map((item) => {
                        const { login, avatar_url } = item;
                        return { companyName: login, avatar: avatar_url };
                    })
                    setOrgs(newOrgs);
                } else {
                    setOrgs(null);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getOrgs();
    }, [orgsUrl])

    //fetch repos
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

    //fetch single user
    React.useEffect(() => {
        async function getUser() {
            try {
                setLoading(true);
                const response = await fetch(`${url}${name}`)
                const data = await response.json();
                if (data && !data.message) {
                    const {
                        login,
                        avatar_url: image,
                        type,
                    } = data;

                    const newUser = {
                        login, image, type
                    }
                    setLoading(false);
                    setUsers(newUser);
                } else {
                    setUsers(null);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getUser();
    }, [name])

    if (loading) {
        return <Loading />
    }
    if (!users) {
        return <Error />
    }
    const { login, image, type } = users;

    return (
        <section className='section user-section'>
            <Link to='/' className='btn btn-primary'>back home</Link>
            <h2 className='section-title'>
                <a href={`https://github.com/${login}`} target='_blank' rel="noreferrer">{login}</a>
            </h2>
            <div className='person'>
                <div className='person-info'>
                    <img src={image} alt={name} />
                    <p>
                        <span className='person-data'>
                            username:
                        </span>
                        <a href={`https://github.com/${login}`} target='_blank'>{login}</a>
                    </p>
                    <p>
                        <span className='person-data'>
                            type:
                        </span>
                        {type}
                    </p>
                    <div>
                        <span className='person-data'>
                            first 3 repo names:
                        </span>
                        <br />
                        <ul>{repos.map(item => <li key={item.id}>{item.name}</li>)}</ul>
                    </div>
                </div>
            </div>
            <div className='company'>
                <div className='company-info'>
                    <p>
                        <span className='person-data'>
                            organizations user belongs:
                        </span>
                        <span className='company-img-container'>
                            {orgs.map(org => {
                                return <span key={org.companyName}>
                                    <img className='company-img' src={org.avatar} alt={org.companyName} />
                                    <a href={`https://github.com/${org.companyName}`} target='_blank' rel="noreferrer"  >{org.companyName}</a>
                                </span>
                            })}
                        </span>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default SingleUser
