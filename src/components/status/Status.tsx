import cn from 'classnames';

import './Status.css';

const STATUS_COLOR = {
  Alive: 'status__green',
  Dead: 'status__red',
  Unknown: 'status__orange',
};

export type TStatus = keyof typeof STATUS_COLOR;

interface IStatus {
  status: TStatus;
}

export const Status = ({ status }: IStatus) => {
  const colorClass = STATUS_COLOR[status];
  return <span className={cn('status', colorClass)}></span>;
};
