const { validationResult} = require('express-validator');
module.exports = validator => {
    return async (req, res, next) => {
        await Promise.all(validator.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        } else {
            return res.status(400).json({ errors: errors.array() });
        }
    }
}
