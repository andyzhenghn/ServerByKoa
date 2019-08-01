const iterate = (...arg) => {
    if (!arg.length) return 0;
    return arg.reduce((previous, current) => previous + current);
};

const createObj = name => ({
    id: 12,
    name,
});

module.exports = {
    iterate,
    createObj,
};