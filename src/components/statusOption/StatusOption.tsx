import { Status } from '../status/Status';
import { isValidStatus } from '../status/StatusTypes';

interface IStatusOption {
  value?: string;
}

export const StatusOption = ({ value }: IStatusOption) => {
  const shouldShowStatus = value && isValidStatus(value);

  return (
    <div className='select__status_option'>
      <span>{value}</span>
      {shouldShowStatus && <Status status={value} />}
    </div>
  );
};
