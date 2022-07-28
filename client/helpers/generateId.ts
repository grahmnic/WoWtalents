import { ObjectId } from 'bson';

export const generateId = () => {
    const id = new ObjectId();
    return id.toString();
}