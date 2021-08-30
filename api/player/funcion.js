const filtering = (list, propN, propV) => new Promise((resolve) => {
    return resolve(list.filter( obj => obj.propN === obj.propV));
});

module.exports = filtering;