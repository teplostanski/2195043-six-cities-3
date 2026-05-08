import { AppRoutes } from '../../shared/constants';
import { AuthGate } from '../auth-gate/auth-gate';

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => (
  <AuthGate requireAuth redirectTo={AppRoutes.Login}>
    {children}
  </AuthGate>
);

export { PrivateRoute };
