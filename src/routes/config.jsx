// Library import
import { Navigate } from 'react-router-dom';

// Local import
import { ComingSoon, Layout } from '../components/Shared';
import { isAuthenticatedUser } from '../utils/utils';
import { Login } from '../panels/Authentication/Login';
import { Signup } from '../panels/Authentication/SignUp';
import { ForgotPassword } from '../panels/Authentication/ForgotPassword';
import { ResetPassword } from '../panels/Authentication/ResetPassword';
import { MarketData } from '../panels/UserPanel/MarketData';

// Private routes
export const pannelRoutes = [
  {
    path: '/',
    moduleName: 'Base',
    element: <Navigate to='/dashboard' replace />,
  },
  {
    path: '/dashboard',
    moduleName: 'Dashboard',
    element: (
      <Layout>
        <ComingSoon />
      </Layout>
    ),
  },
  {
    path: '/market-data',
    moduleName: 'Market data',
    element: (
      <Layout>
        <MarketData />
      </Layout>
    ),
  },
];

// Auth routes
export const authRoutes = [
  {
    path: '/',
    moduleName: 'Base',
    element: isAuthenticatedUser ? (
      <Navigate to='/dashboard' replace />
    ) : (
      <Navigate to='/login' replace />
    ),
  },
  {
    path: '/login',
    moduleName: 'Login',
    element: <Login />,
  },
  {
    path: '/signup',
    moduleName: 'Signup',
    element: <Signup />,
  },
  {
    path: '/forgot-password',
    moduleName: 'Forgot password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    moduleName: 'Reset Password',
    element: <ResetPassword />,
  },
  {
    path: '/term-and-conditions',
    moduleName: 'Term and conditions',
    element: <ComingSoon />,
  },
  {
    path: '*',
    element: isAuthenticatedUser ? (
      <Navigate to='/dashboard' replace />
    ) : (
      <Navigate to='/login' replace />
    ),
  },
];
