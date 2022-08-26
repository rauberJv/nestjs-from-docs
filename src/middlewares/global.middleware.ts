import {Request, Response, NextFunction} from "express"
/* 
    Um middleware pode ser global, sendo utilizado
    em todos os modulos e não precisando informar sua 
    utilização em todos os modulos.

    Assim, no arquivo main.ts podemos apenas chamar
    o middleware e aplicar na função app.use()
*/
export function globalMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log('Request by global middleware')
    next()
}