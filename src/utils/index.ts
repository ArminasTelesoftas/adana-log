export const today = () => new Date();
export const monthAgo = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date;
};
