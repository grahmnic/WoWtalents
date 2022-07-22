import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import cors from 'cors';
import responseTime from 'response-time';
import { Router } from 'express';
import passport from 'passport';
import session from 'express-session';
import RedisStore from 'connect-redis';
import MongoStore from 'connect-mongo';
import { IConfig } from 'config';

export default ({
    router,
    environment
}: {
    router: Router,
    environment: IConfig
}) => {
    const application = express();

    application.use(cookieParser());

    // Post Request Body Parsing
    application.use(bodyParser.json());
    application.use(bodyParser.urlencoded({ extended: true }));

    application.use(cors({
        origin: [
            environment.get('modules.client')
        ],
        credentials: true,
        exposedHeaders: ['set-cookie']
    }));

    application.use(responseTime((req, res, time) => {
        console.log(req.method, req.url, time + 'ms');
    }));

    application.use(
        session({
            secret: 'breaking-dev-secret',
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: 'auto',
                sameSite: 'lax'
            }
        })
    );

    application.use(csrf());

    application.use(passport.initialize());
    // application.use(passport.session());

    // Register router to application
    application.use(router);

    return application;
}
