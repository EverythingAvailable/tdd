const filtering = (propName, propValue, list) => new Promise((resolve) => {
    return resolve(list.filter( obj => obj.propName === propValue));
});

module.exports = filtering;

