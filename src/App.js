import axios from "axios";
import { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

const App = () => {
  const [data, setData] = useState(null);
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get all posts
  // GET https://jsonplaceholder.typicode.com/posts
  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then(res => {
          setData(res.data);
          setError('');
          setLoading(false);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err.message);
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.statusText);
          setError(err.message);
          setData(null);
          setLoading(false);
        });
    }, 2000);
  };

  // Add new post
  // POST https://jsonplaceholder.typicode.com/posts
  const addUser = newUser => {
    setLoading(true);
    axios
      .post('https://jsonplaceholder.typicode.com/posts', newUser)
      .then(res => {
        setData(prev => [...prev, res.data]);
        setError('');
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setData(null);
        setLoading(false);
      });
  };

  // Edit Post
  const editUser = user => {
    setCurrent(user);
  };

  // Delete post
  // DELETE https://jsonplaceholder.typicode.com/posts/:id
  const deleteUser = id => {
    setLoading(true);
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => {
        setData(data.filter(user => user.id !== id));
        setError('');
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setData(null);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading === true) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error !== '') {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <UserForm addUser={addUser} current={current} />
      <UserList data={data} deleteUser={deleteUser} editUser={editUser} />   
    </div>
  );
};

export default App;
