import { useEffect } from 'react'
import type { UnmountedCallback } from './types';

export function useUnmounted(callback?: UnmountedCallback) {
    useEffect(() => {
        return () => {
            callback?.()
        }
    }, [])
}