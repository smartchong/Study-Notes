function memory(fn,maxSize = 100) {
    // [{hash,value}]
    let cache = [];

    return (...args) => {
        const hash = args.join(',');
        const item = cache.find(x => x.hash === hash);
        if (item) {
            item.time = new Date().getTime();
            return item.value;
        }
        const result = fn(...args);
        cache.push({
            hash,
            value:result,
            time:new Date().getTime(),
        });
        if (cache.length > maxSize) {
            let min = Infinity;
            let minItem = null;
            for (let item of cache) {
                if (item.time < min) {
                    min = item.time;
                    minItem = item;
                }
            }
            cache = cache.filter(x => x !== minItem);
        }
        return result;
    }
}