import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from 'rxjs'
import { map } from "rxjs/operators";

/* 

    O Interceptor ocorre na hora da requisição e 
    na hora da resposta de uma rota que é chamada

    Pode ser utilizado para executar algo antes 
    e após a requisição, bem como adicionar dados
    e executar funções assíncronas com os dados.

    Caso não faça o handle, ele não ira executar o metodo
    chamado através da rota

    Neste exemplo de interceptor podemos ver uma alteração
    no retorno da resposta, sempre trazendo agora como 
    { data: [], time: Date.now() }

*/

export interface Response<T> {
    data: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> | Promise<Observable<Response<T>>> {
        console.log('Request by TransformInterceptor')
        return next.handle()
            .pipe(
                map(data => ({
                    data, time: Date.now()
                }))
            )
    }
}