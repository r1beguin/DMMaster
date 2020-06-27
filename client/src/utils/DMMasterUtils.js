export function GetNested(obj, ...args) {
    return args.reduce((obj, level) => obj && obj[level], obj)
}