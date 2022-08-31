import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap, timeout } from "rxjs/operators";

/* 

    O Interceptor ocorre na hora da requisição e 
    na hora da resposta de uma rota que é chamada

    Pode ser utilizado para executar algo antes 
    e após a requisição, bem como adicionar dados
    e executar funções assíncronas com os dados.

    Caso não faça o handle, ele não ira executar o metodo
    chamado através da rota

*/

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log('Request by Loggin Interceptor Before')

        const now = Date.now()
        return next
            .handle()
            .pipe(
                tap(() => console.log(`Request by Loggin Interceptor after ${Date.now() - now}ms`))
            )
    }
}