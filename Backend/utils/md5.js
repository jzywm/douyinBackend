const md5 = require('crypto');

exports.md5 = (value) => {
    const hash = md5.createHash('md5');
    hash.update(value);
    return hash.digest('hex');
}