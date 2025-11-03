import { useEffect, useState } from 'react';

import { Loading } from '@/shared';
import type { ICharacters } from '@/widgets';

interface ILazyLoad {
  items: ICharacters[];
  children: (item: ICharacters) => React.ReactNode;
}

export const LazyLoad = ({ items, children }: ILazyLoad) => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 50
      ) {
        if (visibleCount < items.length) {
          setIsLoading(true);
          setTimeout(() => {
            setVisibleCount((prevCount) =>
              Math.min(prevCount + 4, items.length)
            );
            setIsLoading(false);
          }, 300);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items.length, visibleCount, isLoading]);

  return (
    <div className='characters__container'>
      {items.slice(0, visibleCount).map((item) => (
        <div key={item.id}>{children(item)}</div>
      ))}

      {isLoading && (
        <div className='characters__loading'>
          <Loading size='small' />
        </div>
      )}
    </div>
  );
};
