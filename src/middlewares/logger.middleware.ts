import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

/*
    Middlewares são muito utilizados para tratar alguma
    informação da requisição antes de ir para o roteamento
    por exemplo verificar algum token, ou executar alguma
    função qualquer antes de prosseguir para a Controller

*/

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Request by class Middleware')
        next();
    }
}