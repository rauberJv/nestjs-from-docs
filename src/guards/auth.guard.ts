import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

/*

    Um guard é executado após os middlewares e antes r
    dos pipes. Sendo um bom local para validar token
    de autorização ou validar autenticação

    Implementamos a classe CanActivate e por fim podemos
    fazer o tipo de trabalho que quisermos com a requisição
    antes de permiti-la prosseguir para os controllers

    Para utilizar o guard de forma global, devemos alterar o 
    arquivo main.ts e inserir a seguinte linha
    app.useGlobalGuards(new AuthGuard())
*/

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request)
  }  
}

function validateRequest(req: Request): boolean {
    console.log('Request by AuthGuard')
    return !!req
}