type Handler = {
    reset: () => void,
    toggle: () => void
}

export type HookResult = [boolean, Handler]