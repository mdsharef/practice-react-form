export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}

export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

export const mapValueObj = (obj, cb) => {
    return Object.keys(obj).reduce((acc, cur) => {
        cb(obj, acc, cur);
        return acc;
    }, {});
}