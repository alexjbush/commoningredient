/**
 * Let only the latest concurrent promise resolve
 * @returns Function that takes a promise and let's only the latest concurrent promise resolve
 */
export function latest<T>(): (latestPromise: Promise<T>) => Promise<T> {
    let latestPromise: Promise<T> | null = null;
    return (p: Promise<T>) => {
        latestPromise = p;
        return p.then((results) => {
            if (p === latestPromise) {
                return results
            } else {
                return new Promise(() => { })
            }
        }, (error) => {
            if (p === latestPromise) {
                return error
            } else {
                return new Promise(() => { })
            }
        })

    }
}