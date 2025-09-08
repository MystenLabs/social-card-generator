import * as React from 'react';

export function useSessionStorage<T>(key: string, initialValue: T) {
  const state = React.useState<T>(() => {
    const stored = sessionStorage.getItem(key);
    return (stored ? JSON.parse(stored) : initialValue) as T;
  });

  React.useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state[0]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state[0]]);

  return state;
}
