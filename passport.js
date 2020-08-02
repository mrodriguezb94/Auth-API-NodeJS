const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('./configuration');
const User = require('./models/user');

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);
        
        // If user doesn't exists, handle it
        if (!user) {
            return done(null, false);
        }
        
        // Otherwise, return the user
        return done(null, user);

    } catch(error) {
        done(error, false);
    }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email',

}, async (email, password, done) => {

    try {
        // FIND USER WITH EMAIL
        const user = await User.findOne({ email });

        // IF NOT, HANDLE IT
        if (!user) {
            return (null, false);
        }


        // CHECK IF PASSWORD IS CORRECT
        const isMatch = await user.isPasswordValid(password);

        // IF NOT, HANDLE IT
        if(!isMatch) {
            return done(null, false);
        }

        // OTHERWISE RETURN THE USER
        done(null, user);
    } catch (error) {
        done(error);
    }
}));