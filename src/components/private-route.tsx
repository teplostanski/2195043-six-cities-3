import { Navigate } from 'react-router-dom';
import { routes } from '../shared/constants';
import { useAppSelector } from '../shared/hooks/redux';

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAppSelector((state) => state.authReducer);

  return isAuthenticated ? children : <Navigate to={routes.login} />;
};

export { PrivateRoute };
