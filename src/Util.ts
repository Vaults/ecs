export const removeFromArray = <T>(arr: T[], elt: T) => {
    return arr.filter(x => x !== elt);
};