import { User } from './models/User'; // ajuste o caminho conforme necessário
import { Request } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        userID?: string;
        user?: User; // Se você precisar adicionar mais propriedades no futuro
    }
}
