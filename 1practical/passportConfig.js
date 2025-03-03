const LocalStrategy = require('passport-local').Strategy;
const User = require('./schema'); // Adjust the path as necessary

exports.initializePassport = (passport)=> {
    passport.use(new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ UserName : username });
            if (!user) {
                console.log('User not found:', username);
                return done(null, false, { message: 'User Not Found' });
            } else if (user.password !== password) {
                console.log('Invalid Password:', username);
                return done(null, false, { message: 'Invalid password' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}