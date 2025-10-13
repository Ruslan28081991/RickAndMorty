import cn from 'classnames';

import './Status.css';

const STATUS_COLOR = {
  Alive: 'green',
  Dead: 'red',
  Unknown: 'orange',
};

export type TStatus = keyof typeof STATUS_COLOR;

interface IStatus {
  status?: TStatus;
}

export const Status = ({ status = 'Alive' }: IStatus) => {
  const colorClass = STATUS_COLOR[status];

  return <span className={cn('status', colorClass)}></span>;
};
