import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcryptjs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//bcrypt
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

export default __dirname;

