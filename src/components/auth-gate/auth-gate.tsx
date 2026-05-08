import { Navigate } from 'react-router-dom';
import { AuthStatus } from '../../shared/constants';
import { useAppSelector } from '../../shared/hooks/redux';
import {
  selectAuthorizationStatus,
  selectIsAuthenticated,
} from '../../store/reducers/auth-slice';
import { Spinner } from '../spinner/spinner';

type AuthGateProps = {
  children: JSX.Element;
  requireAuth: boolean;
  redirectTo: string;
};

const AuthGate = ({ children, requireAuth, redirectTo }: AuthGateProps) => {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (authorizationStatus === AuthStatus.Unknown) {
    return <Spinner />;
  }

  if (requireAuth) {
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }

  return isAuthenticated ? <Navigate to={redirectTo} /> : children;
};

export { AuthGate };
