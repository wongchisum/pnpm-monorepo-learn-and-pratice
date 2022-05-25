import { useState } from "react";
import { useMounted } from '../useMounted'

export function useScript(src: string, onloadCallback?: () => void) {
    const [pending, setPending] = useState(false);

    // 脚本加载完毕
    const scriptLoaded = () => {
        setPending(false);
        onloadCallback?.()
    }

    useMounted(() => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.addEventListener("load", scriptLoaded)

        return () => {
            script?.removeEventListener("load", scriptLoaded)
        }
    })

    return pending
};