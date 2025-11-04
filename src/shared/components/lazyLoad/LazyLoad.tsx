import { useEffect, useState } from 'react';

import { useThrottle } from '@/hooks';
import { Loading } from '@/shared';
import type { ICharacters } from '@/widgets';

interface ILazyLoad {
  items: ICharacters[];
  children: (item: ICharacters) => React.ReactNode;
}

export const LazyLoad = ({ items, children }: ILazyLoad) => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 50
    ) {
      if (visibleCount < items.length) {
        setIsLoading(true);
        setTimeout(() => {
          setVisibleCount((prevCount) => Math.min(prevCount + 4, items.length));
          setIsLoading(false);
        }, 300);
      }
    }
  };

  const throttledHandleScroll = useThrottle(handleScroll, 200);
  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll);
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [throttledHandleScroll]);

  return (
    <>
      {items.slice(0, visibleCount).map((item) => (
        <li key={item.id}>{children(item)}</li>
      ))}

      {isLoading && (
        <div className='characters__loading'>
          <Loading size='small' />
        </div>
      )}
    </>
  );
};
