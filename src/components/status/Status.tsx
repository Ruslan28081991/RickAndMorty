import cn from 'classnames';

import { STATUS_COLOR, type TStatus } from './StatusTypes';

import './Status.css';

interface IStatus {
  status: TStatus;
}

export const Status = ({ status = 'Alive' }: IStatus) => {
  const colorClass = STATUS_COLOR[status];

  return <span className={cn('status', colorClass)}></span>;
};
