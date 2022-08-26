import { Request, Response, NextFunction } from "express";

/* 
    Uma forma alternativa para middlewares são criar funções
    eles não necessariamente precisam ser classes. Tornando 
    assim uma forma mais fácil de manusear quando não se é 
    necessário dependências dentro do middleware.
    
*/

export function functionalLogger(req: Request, res: Response, next: NextFunction) {
    console.log('Request by functional logger...')
    next()
}