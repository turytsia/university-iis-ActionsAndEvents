import { Link, Route, RouterProvider, Navigate, Routes, createBrowserRouter } from 'react-router-dom';
import Page from './components/Page/Page';
import Header from './components/Header/Header';
import Events from './pages/Events/Events';
import Register from './pages/Register/Register';
import { AppContext } from './context/AppContextProvider';
import { useContext } from 'react';
import Login from './pages/Login/Login';
import { roles } from './utils/common';
import Admin from './pages/Admin/Admin';
import Container from './components/Container/Container';
import Categories from './pages/Admin/pages/Categories/Categories';
import Users from './pages/Admin/pages/Users/Users';
import Managers from './pages/Admin/pages/Managers/Managers';
import Places from './pages/Admin/pages/Places/Places';
import Profile from './pages/Profile/Profile';
import User from './pages/Profile/pages/User/User';
import UserEvents from './pages/Profile/pages/UserEvents/UserEvents';
import CreateEvent from './pages/CreateEvent/CreateEvent';
import CreateEventForm from './pages/CreateEvent/pages/CreateEventForm/CreateEventForm';
import Tickets from './pages/CreateEvent/pages/Tickets/Tickets';
import Menu from './components/Menu/Menu';
import Content from './components/Content/Content';

import "react-datepicker/dist/react-datepicker.css";
import EventDetail from './pages/EventDetail/EventDetail';

function App() {

  const context = useContext(AppContext)

  return (
    <Page>
      <Header />
      <Container>
        <Content>
          <Routes>
            <Route index element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} />
            {
              (context.isAuth && context.user && context.user.role === roles.ADMIN) && (
                <>
                  <Route path="admin" element={<Admin />} >
                    <Route path="" element={<Categories />} />
                    <Route path="places" element={<Places />} />
                    <Route path="users" element={<Users />} />
                    <Route path="managers" element={<Managers />} />
                  </Route>
                </>
              )
            }
            {
              context.isAuth && context.user && (
                <>
                  <Route path="profile" element={<Profile />}>
                    <Route path="" element={<User />} />
                    <Route path="events" element={<UserEvents />} />
                  </Route>
                  <Route path="/events/create" element={<CreateEvent />}>
                    <Route path="" element={<CreateEventForm />} />
                  </Route>
                  <Route path="tickets" element={<Tickets />} />
                </>
              )
            }
            {
              !context.isAuth && (
                <>
                  <Route path="/user/register" element={<Register role={roles.USER} />} />
                  <Route path="/manager/register" element={<Register role={roles.MANAGER} />} />
                  <Route path="/admin/register" element={<Register role={roles.ADMIN} />} />
                  <Route path="/login" element={<Login />} />
                </>
              )
            }
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Content>
      </Container>
    </Page>
  );
}

export default App;