
import * as React from 'react'

/**
 * https://stackoverflow.com/questions/53574614/multiple-calls-to-state-updater-from-usestate-in-component-causes-multiple-re-re
 * @param initialState object
 */
export const useMergeState = (initialState: any = {}) => {
  const [state, setState] = React.useState(initialState);
  const setMergedState = newState => setState(prevState => Object.assign({}, prevState, newState));
  return [state, setMergedState];
}


/**
 * const objFinal = useMemoCompare(obj, (prev, next) => {
 * return prev && prev.id === next.id;
 *  });
 * 
 * @param next 
 * @param compare 
 */
export const useMemoCompare = (next, compare) => {
  // Ref for storing previous value
  const previousRef = React.useRef();
  const previous = previousRef.current;
  // Pass previous and next value to compare function
  // to determine whether to consider them equal.
  const isEqual = compare(previous, next);
  // If not equal update previousRef to next value.

  // We only update if not equal so that this hook continues to return

  // the same old value if compare keeps returning true.
  React.useEffect(() => {
    if (!isEqual) {
      previousRef.current = next;
    }

  });
  // Finally, if equal then return the previous value
  return isEqual ? previous : next;
}




// Hook
/**
 * const { execute, status, response, error } = useAsync(myFunction, false);
 * @param asyncFunction 
 * @param immediate 
 */

export const useAsync = <T, E = string>(asyncFunction: () => Promise<T>, immediate = true) => {

  const [status, setStatus] = React.useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [value, setValue] = React.useState<T | null>(null);
  const [error, setError] = React.useState<E | null>(null);
  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = React.useCallback(() => {
    setStatus('pending');
    setValue(null);
    setError(null);
    return asyncFunction()
      .then((response: any) => {
        setValue(response);
        setStatus('success');
      })
      .catch((error: any) => {
        setError(error);
        setStatus('error');
      });
  }, [asyncFunction]);
  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  React.useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };

};