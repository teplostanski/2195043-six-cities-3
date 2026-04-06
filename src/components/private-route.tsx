import { Navigate } from 'react-router-dom';
import { routesMap } from '../shared/constants';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const hasAccess = true;

  return hasAccess ? children : <Navigate to={routesMap.login} />;
}

export default PrivateRoute;
