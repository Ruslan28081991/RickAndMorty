import { useEffect } from 'react';

import { useThrottle } from '@/hooks';
import { Loading } from '@/shared';
import { SCROLL_THRESHOLD, THROTTLE_DELAY } from '@/shared/constants';
import type { ICharacters } from '@/widgets';

interface ILazyLoad {
  items: ICharacters[];
  isHasMore: boolean;
  isLoadingMore: boolean;
  onLoadNextPage: () => void;
  children: (item: ICharacters) => React.ReactNode;
}

export const LazyLoad = ({
  items,
  isHasMore,
  isLoadingMore,
  onLoadNextPage,
  children,
}: ILazyLoad) => {
  const handleScroll = () => {
    if (isLoadingMore) return;

    if (
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - SCROLL_THRESHOLD &&
      isHasMore
    ) {
      onLoadNextPage();
    }
  };

  const throttledHandleScroll = useThrottle(handleScroll, THROTTLE_DELAY);

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll);
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [throttledHandleScroll]);

  return (
    <>
      {items.map((item, index) => (
        <li key={`${item.id}-${index}`}>{children(item)}</li>
      ))}

      {isLoadingMore && (
        <div className='characters__loading'>
          <Loading size='small' />
        </div>
      )}
    </>
  );
};
