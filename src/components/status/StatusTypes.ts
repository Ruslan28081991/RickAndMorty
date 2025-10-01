export const STATUS_COLOR = {
  Alive: 'green',
  Dead: 'red',
  Unknown: 'orange',
} as const;

export type TStatus = keyof typeof STATUS_COLOR;

export const isValidStatus = (status: string): status is TStatus => {
  return status in STATUS_COLOR;
};
