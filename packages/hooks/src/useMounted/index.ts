import { useEffect } from 'react'
import type { MountedCallback } from './types';

export function useMounted(callback?: MountedCallback) {
    useEffect(() => {
        callback?.()
    }, [])
}