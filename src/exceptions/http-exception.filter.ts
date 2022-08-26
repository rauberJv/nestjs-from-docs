import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

/*

    O decorator @Catch() deve receber um parametro pois 
    ele indica os metadatas para o nest de que ele esta 
    procurando uma exception daquele tipo e nada mais.
    
    Para ele pegar outros tipos de exception deve ser 
    informado uma lista por exemplo
    @Catch([HttpException, DatabaseExceptiond])

    Podemos criar e retornar os dados que quisermos 
    em um exception filter
*/

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost){
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                catSays: 'meow'
            })
    }
}