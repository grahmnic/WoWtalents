import Bluebird, { Promise } from 'bluebird';
import { Db, MongoClient, MongoClientOptions, MongoOptions } from 'mongodb';
import { IConfig } from 'config';

export interface IMongo extends Bluebird<{
    client: MongoClient,
    core: Db
}> {

}

export default ({
    environment
}: {
    environment: IConfig
}) : IMongo => {
    const coreClient = new MongoClient(environment.get('infrastructure.mongouri'));

    // Create a new MongoClient
    return Promise.props({
        core: coreClient.connect()
    }).then(({ core }) => {
        return {
            client: core,
            core: core.db('bkdev')
        }
    }).catch((error) => {
        console.error(`Error connecting to MongoDB`, error.message)
        process.exit()
    });
}
