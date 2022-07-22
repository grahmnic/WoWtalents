import { Response, Request, RequestHandler } from "express";
import { Db } from 'mongodb';

export interface IPostsController {
    getAllPosts: RequestHandler;
}

export default ({
    core
} : {
    core: Db
}): IPostsController => {
    return {

        getAllPosts: async (req: Request, res: Response) => {
            const posts = await core.collection('posts-meta').find({}).toArray();

            return res.json(posts);
        }
    }
}