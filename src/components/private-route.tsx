import { routes } from '../shared/constants';
import { AuthGate } from './auth-gate';

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => (
  <AuthGate requireAuth redirectTo={routes.login}>
    {children}
  </AuthGate>
);

export { PrivateRoute };
