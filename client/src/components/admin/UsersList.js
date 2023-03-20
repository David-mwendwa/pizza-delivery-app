import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import Error from '../Error';
import Moment from 'react-moment';
import {
  deleteUser,
  getUsers,
  resetUser,
  updateUser,
} from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';
import Success from '../Success';

const UsersList = () => {
  const dispatch = useDispatch();
  const { updated, deleted } = useSelector((state) => state.user);
  const usersstate = useSelector((state) => state.users);
  const { loading, error, users } = usersstate;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');

  const handleUpdate = () => {
    if (userId && userRole) {
      dispatch(
        updateUser(userId, { isAdmin: /admin/i.test(userRole) ? true : false })
      );
      handleClose();
    }
  };

  const handleActionBtn = (id) => {
    handleShow();
    setUserId(id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (updated || deleted) {
        dispatch(resetUser());
        window.location.reload();
      }
    }, 2000);
  }, [dispatch, updated, deleted]);

  const setUsers = () => {
    const data = {
      columns: [
        { label: 'User ID', field: 'id', sort: 'asc' },
        { label: 'Name', field: 'name', sort: 'asc' },
        { label: 'Email', field: 'email', sort: 'asc' },
        { label: 'Role', field: 'role', sort: 'asc' },
        { label: 'Date', field: 'date', sort: 'asc' },
        { label: 'Actions', field: 'actions', sort: 'asc' },
      ],
      rows: [],
    };

    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.isAdmin ? (
          <p className='text-success'>admin</p>
        ) : (
          <p className='text-secondary'>user</p>
        ),
        date: <Moment format='YYYY-MM-DD'>{user.createdAt}</Moment>,
        actions: (
          <>
            <div className='d-flex justify-content-around'>
              <Link
                to=''
                className='py-1 px-2'
                onClick={() => handleActionBtn(user._id)}>
                <i className='fa fa-pencil-square' aria-hidden='true'></i>
              </Link>
              <button
                className='btn py-1 px-2 ml-2'
                onClick={() => handleDelete(user._id)}>
                <i className='fa fa-trash'></i>
              </button>
            </div>
          </>
        ),
      });
    });

    return data;
  };

  return (
    <>
      {error && <Error message={error} />}
      {updated && <Success message={'User updated successfully'} />}
      {deleted && <Success message={'User deleted successfully'} />}
      {loading ? (
        <Loader />
      ) : (
        <div>
          {/* <h2
            className='text-center text-decoration-underline'
            style={{ fontSize: '25px', opacity: '.7' }}>
            USERS ({users.length})
          </h2> */}

          <MDBDataTable
            data={setUsers()}
            className='px-3'
            bordered
            striped
            hover
          />
        </div>
      )}
      <Modal size='sm' show={show} onHide={handleClose}>
        <Modal.Body>
          <Form>
            <Form.Select
              name='userRole'
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}>
              <option>Change user role</option>
              <option value='admin'>Admin</option>
              <option value='user'>User</option>
            </Form.Select>
          </Form>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
          <Button variant='secondary' onClick={handleClose}>
            CLOSE
          </Button>
          <Button variant='primary' onClick={handleUpdate}>
            SUBMIT
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UsersList;
