import { useEffect, useMemo, useRef } from 'react';

//debaounce callback function
const useDebounce = (callback, delay) => {
    const timer = useRef();
    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        }
    }, [])

    return useMemo(() => {
        return (...args) => {
            clearTimeout(timer.current);
            timer.current = setTimeout(() => {
                callback(...args);
            }, delay);
        }
    }, [callback, delay])
}

export default useDebounce;