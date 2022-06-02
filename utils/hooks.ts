/*
  A thin wrapper around “useEffect” which
  will only fire when the value changes,
  and not on mount.
*/
import React from 'react';
export default function useEffectOnChange(callback, deps) {
  const hasMounted = React.useRef(false);
  React.useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    callback();
  }, deps);
}
