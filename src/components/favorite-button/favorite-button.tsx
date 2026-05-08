import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { selectIsAuthenticated } from '../../store/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import { favoriteButtonConfig, routes } from '../../shared/constants';
import {
  changeFavoriteAction,
  fetchFavoritesAction,
} from '../../store/async-actions';
import { useCallback } from 'react';

type FavoriteButtonProps = {
  activeOfferId: string;
  isFavorite: boolean;
  variant: keyof typeof favoriteButtonConfig;
};

const FavoriteButton = ({
  activeOfferId,
  isFavorite,
  variant,
}: FavoriteButtonProps) => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const { buttonClass, activeClass, iconClass, iconWidth, iconHeight } =
    favoriteButtonConfig[variant];
  const nextStatus: 0 | 1 = isFavorite ? 0 : 1;

  const handleClick = useCallback(() => {
    if (!isAuthenticated) {
      navigate(routes.login);
      return;
    }

    dispatch(
      changeFavoriteAction({
        id: activeOfferId,
        status: nextStatus,
      }),
    )
      .unwrap()
      .then(() => {
        dispatch(fetchFavoritesAction());
      });
  }, [activeOfferId, dispatch, isAuthenticated, navigate, nextStatus]);

  return (
    <button
      className={cn('button', {
        [buttonClass]: true,
        [activeClass]: isAuthenticated && isFavorite,
      })}
      type="button"
      onClick={handleClick}
    >
      <svg className={iconClass} width={iconWidth} height={iconHeight}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
};

export { FavoriteButton };
