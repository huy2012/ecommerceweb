export function getUniqueListBy(arr) {
    return [...new Set(arr.map(o => JSON.stringify(o)))].map(s => JSON.parse(s));
}
