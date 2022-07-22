import Promise from 'bluebird';
import { asFunction, asValue, createContainer, InjectionMode } from 'awilix';

import application from './factories/application';
import router from './factories/router';
import authentication from './factories/authentication/index';
import environment from './factories/environment';
import mongoConnection from './factories/mongo';

import jwtStrategy from './factories/authentication/jwt';
import loginStrategy from './factories/authentication/login';

import postsController from './controllers/posts';
import usersController from './controllers/users';
import { IMongo } from './factories/mongo';
import { IConfig } from 'config';

const container = createContainer();

container.register({
    environment: asFunction(environment).singleton(),
    mongoConnection: asFunction(mongoConnection).singleton(),

    application: asFunction(application).singleton(),
    router: asFunction(router).singleton(),
    authentication: asFunction(authentication).singleton(),

    jwtStrategy: asFunction(jwtStrategy).singleton(),
    loginStrategy: asFunction(loginStrategy).singleton(),

    postsController: asFunction(postsController).singleton(),
    usersController: asFunction(usersController).singleton()
});

const start = ({
    environment,
    mongoConnection
}: {
    environment: IConfig,
    mongoConnection: IMongo
}) => {
    console.log("Connecting to services...");

    Promise.props({
        mongo: mongoConnection,
    }).then(({ mongo }) => {
        container.register({
            mongo: asValue(mongo),
            core: asValue(mongo.core)
        });

        const application = container.resolve('application');

        const port = 5000;

        // Start the application, listening on configured port
        const server = application.listen(port, () => {
            console.log(`Application is listening on port ${port}`);
        }).on('error', (error: any) => {
            console.error('Error starting application process: ', error)
        })
    })
}

start(container.cradle);