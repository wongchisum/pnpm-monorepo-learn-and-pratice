import { useRef, useEffect } from 'react'

export function usePrevious<T extends unknown>(data: T) {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = data;
    }, [data])

    return ref.current
}