import { useState, useRef } from "react";
import type { HookResult } from './types';

export function useToggle(initBool = false): HookResult {
    const [bool, setBool] = useState(initBool)
    const boolRef = useRef(initBool);

    // 重置状态
    const reset = () => {
        setBool(boolRef.current)
    }
    // 切换状态
    const toggle = () => {
        setBool((val: boolean) => !val)
    };

    return [bool, { reset, toggle }]
}