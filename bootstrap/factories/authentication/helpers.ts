import bcrypt from 'bcrypt';

export const verifyPassword = async (password: string, userPassword: string) => {
    return await bcrypt.compare(password, userPassword);
}