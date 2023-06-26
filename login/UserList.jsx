import { useQuery } from 'react-query';
import axios from 'axios';

function UserList() {
  const { data, isLoading } = useQuery('users', async () => {
    const response = await axios.get('/api/users');
    return response.data;
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>
          {user.firstName} {user.lastName}
        </li>
      ))}
    </ul>
  );
} 
export default UserList;
