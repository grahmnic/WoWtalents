import { Db } from 'mongodb';
import { Strategy } from 'passport-local';
import { verifyPassword } from './helpers';

export default ({
    core
}: {
    core: Db
}) => {
    const strategy = new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, pass, done) => {
        try {
            const user = await core.collection('users').findOne({
                user_id: username
            });

            if (!user) return done(null, false, { message: 'User not found' });

            const validate = await verifyPassword(pass, user.password);

            if (!validate) return done(null, false, { message: 'Wrong password' });

            return done(null, user);
        } catch (error) {
            done(error);
        }
    });

    return strategy;
}
