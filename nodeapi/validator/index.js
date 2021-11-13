exports.createPostValidator = (req, res, next) => {
    req.check('title', "Write a title").notEmpty();
    req.check('title', 'Title must be between 4 and 150 characters').isLength({
        min: 4,
        max: 150
    });

    req.check('body', "Write a body").notEmpty();
    req.check('body', 'Bodu must be between 4 and 2000 characters').isLength({
        min: 4,
        max: 2000
    });
    //check for errors
    const errors = req.validationErrors();

    if(errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    next();
};

exports.userSignupValidator = (req, res, next) => {

    // name not null and between 4-10
    req.check('name', "Name is required").notEmpty();
    req.check('name', 'Name must be between 4 and 150 characters').isLength({
        min: 4,
        max: 15
    });
    // email not null, valid...
    
    req.check('email', 'Email must be between 5 and 35 characters')
    .matches(/.+\@.+\..+/)
    .withMessage("Email must cantain @")
    .isLength({
        min: 5,
        max: 35
    });

    // chack password
    req.check('password', 'Password is required').notEmpty();
    req.check('password')
    .isLength({min: 6})
    .withMessage("Password must contain at leat 6 characters")
    .matches(/\d/)
    .withMessage("Password must caontain a number");
    // chack errors
    const errors = req.validationErrors();

    if(errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error: firstError});
    }
    //proceed to next middleware
    next();
}