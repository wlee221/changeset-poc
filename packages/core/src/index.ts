export const getDate = () => {
    return new Date().toLocaleString();
}

export const log = (message: any, ...rest: any[]) => {
    console.log(getDate(), message, ...rest);
}

export const warn = (message: any, ...rest: any[]) => {
    console.warn(getDate(), message, ...rest);
}
