export function logger(this: unknown, ...args: unknown[]) {
    console.log.apply(this, args)
}