import React, {useEffect,  useState} from 'react';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/api/v1/users')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching users', error);
                setLoading(false);
            });
    }, []);

    if(loading) return <p>Loading...</p>;

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}, {user.email}</li>
                ))}
            </ul>
        </div>
    )
}

export default Users;
