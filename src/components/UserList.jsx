import React from 'react';
import UserItem from './UserItem';

const UserList = ({ data, deleteUser, editUser }) => {
  return (
    <div className="row">
      {data !== null &&
        data instanceof Array &&
        data.map(user => (
          <UserItem
            user={user}
            key={user.id}
            deleteUser={deleteUser}
            editUser={editUser}
          />
        ))}
    </div>
  );
};

export default UserList;