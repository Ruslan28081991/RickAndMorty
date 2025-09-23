import './Status.css';

import cn from 'classnames';

const STATUS_COLOR = {
  Alive: 'green',
  Dead: 'red',
  Unknown: 'orange',
};

interface IStatus {
  status: 'Alive' | 'Dead' | 'Unknown';
}

export const Status = ({ status }: IStatus) => {
  const colorClass = STATUS_COLOR[status];
  return <span className={cn('status', `${colorClass}`)}></span>;
};
