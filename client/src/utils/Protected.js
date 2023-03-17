import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * A route component utility to restrict unauthorized access 
 * @param {*} children - parse protected route components as a child
 * @returns redirect to homepage or to a protected route component if authorized/authenticated
 * @example <Route
              path='/admin'
              element={
                <Protected>
                  <Dashbaord isAdmin={true} />
                </Protected>
              }
              exact
            />
 */
const Protected = ({ children }) => {
  const { currentUser } = useSelector((state) => state.userLogin);
  const isAuthorized =
    (currentUser && (/admin/i.test(currentUser.role) || currentUser.isAdmin)) ||
    false;

  if (!isAuthorized) {
    return <Navigate to='/' replace />;
  }
  return children;
};
export default Protected;
