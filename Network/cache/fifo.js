function memory(fn, maxSize = 100) {
    // [{hash,value}]
    const cache = [];

    return (...args) => {
        const hash = args.join(',');
        const item = cache.find(x => x.hash === hash);
        if (item) {
            return item.value;
        }
        const result = fn(...args);
        cache.push({
            hash,
            value:result,
        });
        if (cache.length > maxSize) {
            cache.shift();
        }
        return result;
    }
}