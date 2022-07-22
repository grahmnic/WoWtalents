import { Response, Request, RequestHandler } from "express";
import { Db } from 'mongodb';
import bcrypt from 'bcrypt';

export interface IUsersController {
    addUser: RequestHandler;
}

export default ({
    core
} : {
    core: Db
}): IUsersController => {
    return {

        addUser: async (req: Request, res: Response) => {
            const username: string = req.body.username;
            const password: string = req.body.password;

            if (
                !username ||
                !password ||
                username.trim() !== username ||
                username.trim() === "" ||
                password.trim() !== password ||
                password.trim() === ""
            ) return res.json({
                error: 'Invalid username/password'
            });

            const user = await core.collection('users').findOne({
                user_id: username
            }, {
                projection: {
                    user_id: 1
                }
            });

            if (user) return res.json({ error: 'Username already taken' })

            bcrypt.hash(password, 10).then(async (hashedPassword) => {
                await core.collection('users').insertOne({
                    user_id: username,
                    password: hashedPassword
                }).then(async ({ acknowledged }) => {
                    if (acknowledged) return res.json({
                        message: 'Succesfully signed up',
                        payload: {
                            username
                        }
                    });
                });
            });
        }
    }
}