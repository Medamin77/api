import React from 'react';

const UserItem = ({ user, deleteUser, editUser }) => {
  const { id, title, body } = user;

  const onDeleteUser = () => deleteUser(id);

  const onEditUser = () => editUser(user);

  return (
    <div className="col-md-6 mb-2">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {' '}
            <span className="badge text-bg-success">{id}</span> {title}
          </h5>
          <p className="card-body">{body}</p>
          <a
            href="#!"
            className="btn btn-secondary me-2"
            data-bs-toggle="modal"
            data-bs-target="#addPost"
            onClick={onEditUser}
          >
            Edit
          </a>
          <a href="#!" className="btn btn-danger" onClick={onDeleteUser} >
            Delete
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserItem;