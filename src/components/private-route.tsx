import { Navigate } from 'react-router-dom';
import { routes } from '../shared/constants';
import { useAppSelector } from '../shared/hooks/redux';
import { selectIsAuthenticated } from '../store/reducers/authSlice';

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return isAuthenticated ? children : <Navigate to={routes.login} />;
};

export { PrivateRoute };
