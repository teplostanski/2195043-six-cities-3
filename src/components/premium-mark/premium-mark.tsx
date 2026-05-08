import { PremiumMarkConfig } from '../../shared/constants';

type PremiumMarkProps = {
  show: boolean;
  variant: keyof typeof PremiumMarkConfig;
};

const PremiumMark = ({ show, variant }: PremiumMarkProps) => {
  if (!show) {
    return null;
  }

  const className = PremiumMarkConfig[variant];

  return (
    <div className={className}>
      <span>Premium</span>
    </div>
  );
};

export { PremiumMark };
