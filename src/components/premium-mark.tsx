type PremiumMarkProps = {
  show: boolean;
};

function PremiumMark({ show }: PremiumMarkProps) {
  // Возвращаем null или фрагмент, лишние скобки убраны
  return show ? (
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
  ) : null;
}

export default PremiumMark;
