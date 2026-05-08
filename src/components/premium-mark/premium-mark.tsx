type PremiumMarkProps = {
  show: boolean;
};

const PremiumMark = ({ show }: PremiumMarkProps) => {
  return show ? (
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
  ) : null;
}

export { PremiumMark };
