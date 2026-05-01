import { Navigate } from 'react-router-dom';
import { authStatus, routes } from '../shared/constants';
import { useAppSelector } from '../shared/hooks/redux';

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { authorizationStatus } = useAppSelector((state) => state.authReducer);
  const hasAccess = authorizationStatus === authStatus.auth;

  return hasAccess ? children : <Navigate to={routes.login} />;
};

export { PrivateRoute };
