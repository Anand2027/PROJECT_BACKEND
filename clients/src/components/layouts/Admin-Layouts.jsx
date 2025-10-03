import { NavLink, Outlet, Navigate } from 'react-router-dom';
// import { FaUser, FaMessage, FaListCheck } from 'react-icons/fa6';
// import { FaHome } from 'react-icons/fa';
import { useAuth } from '../../store/auth';

export const AdminLayout = () => {
  // const { user, isLoading } = useAuth();

  // if (isLoading) {
  //   return <h1>Loading ...</h1>;
  // }

  // if (!user?.isAdmin) {
  //   return <Navigate to="/" />;
  // }

  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li>
                <NavLink to="/admin/users">
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts">
                 Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/service">
                   Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/">
                   Home
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};
