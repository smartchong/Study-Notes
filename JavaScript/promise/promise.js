Promise.all = function(promiseArr) {
    return new Promise(function(resolve,reject) {
        const length = promiseArr.length;
        const result = [];
        let count = 0;
        if (length === 0) {
            return resolve(result);
        }
        for(let item of promiseArr) {
            Promise.resolve(item).then(function(data) {
                result[count++] = data;
                if (count === length) {
                    resolve(result);
                }
            },function(reason) {
                reject(reason);
            });
        }
    });
}

Promise.race = function(promiseArr) {
    return new Promise(function(resolve,reject) {
        const length = promiseArr.length;
        if (length === 0) {
            return resolve();
        }
        for(let item of promiseArr) {
            Promise.resolve(item).then(function(value) {
                return resolve(value);
            }, function(reason) {
                return reject(reason);
            })
        }
    });
}

Promise.any = function(promiseArr) {
    return new Promise(function(resolve,reject) {
        const length = promiseArr.length;
        const result = [];
        let count = 0;
        if (length === 0) {
            return resolve(result);
        }
        for(let item of promiseArr) {
            Promise.resolve(item).then((value) => {
                return resolve(value);
            },(reason) => {
                result[count++] = reason;
                if (count === length) {
                    reject(result);
                }
            });
        }
    })
}

Promise.allSettled = function(promiseArr) {
    return new Promise(function(resolve) {
        const length = promiseArr.length;
        const result = [];
        let count = 0;
        
        if (length === 0) {
            return resolve(result);
        } else {
            for(let item of promiseArr) {
                Promise.resolve(item).then((value) => {
                    result[count++] = {
                        status: 'fulfilled',
                        value: value,
                    };
                    if (count === length) {
                        return resolve(result);
                    }
                }, (reason) => {
                    result[count++] = {
                        status: 'rejected',
                        reason: reason,
                    };
                    if (count === length) {
                        return resolve(result);
                    }
                })
            }
        }
    })
}

