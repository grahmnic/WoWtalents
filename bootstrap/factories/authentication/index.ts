import { Passport, Strategy } from 'passport';

export default ({
    jwtStrategy,
    loginStrategy,
}: {
    jwtStrategy: Strategy,
    loginStrategy: Strategy
}) => {
    const passport = new Passport();

    passport.use(jwtStrategy);
    passport.use('login', loginStrategy);

    return passport;
}