import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from './pages/login';
import Contact from './components/Admin/ManageBooks/TableBooks';
import Register from './pages/register';
import { Outlet } from "react-router-dom";
import Footer from './components/Footer';
import Home from './components/Home';
import ErrorPage from './components/Error';
import './App.scss'
import { fetchAccount } from './services/api';
import { useDispatch, useSelector } from 'react-redux';
import { doGetAccountAction } from './redux/account/accountSlice';
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import HeaderPage from './components/Header';
import LayoutAdmin from './pages/admin/LayoutAdmin';
import TableBooks from './components/Admin/ManageBooks/TableBooks';
import ManageOrders from './pages/manage-orders';
import DashBoard from './pages/admin';
import TableUser from './components/Admin/ManageUsers/TableUser';

const Layout = () => {
  return (
    <div className='layout-app'>
      <HeaderPage />
      <div className='outlet'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default function App() {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.account.isLoading)

  const getAccount = async () => {
    if (
      window.location.pathname === '/login'
      || window.location.pathname === '/register')
      return;

    const res = await fetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data))
    }
  }

  useEffect(() => {
    getAccount()
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "contact",
          element: <Contact />,
        },
      ],
    },

    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true, element:
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
        },
        ,
        {
          path: "user-crud",
          element: <TableUser />,
        },
        {
          path: "manage-books",
          element: <TableBooks />,
        },
        {
          path: "manage-orders",
          element: <ManageOrders />,
        }
      ],
    },

    {
      path: "/login",
      element: <LoginPage />
    },

    {
      path: "/register",
      element: <Register />
    },
  ]);

  return (
    <>
      {
        isLoading === false
          || window.location.pathname === '/'
          || window.location.pathname === '/login'
          || window.location.pathname === '/register'
          ?
          <RouterProvider router={router} />
          :
          <Loading />
      }
    </>
  )
}

