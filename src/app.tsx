import { MainPage } from './pages/main/main';
import { type Offer } from './shared/types';

type AppProps = {
  offers: Offer[];
};

export function App({ offers }: AppProps) {
  return <MainPage offers={offers} />;
}
