import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { MDBDataTable } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import Error from '../Error';
import Moment from 'react-moment';
import { getUsers, updateUser } from '../../redux/actions/userActions';

const UsersList = () => {
  const dispatch = useDispatch();
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
      window.location.reload();
    }
  };

  const handleActionBtn = (id) => {
    handleShow();
    setUserId(id);
  };

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
            <button
              className='btn btn-secondary'
              onClick={() => handleActionBtn(user._id)}>
              UPDATE
            </button>
          </>
        ),
      });
    });

    return data;
  };

  return (
    <>
      {error && <Error message={error} />}
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h2
            className='text-center text-decoration-underline'
            style={{ fontSize: '25px', opacity: '.7' }}>
            USERS ({users.length})
          </h2>
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
