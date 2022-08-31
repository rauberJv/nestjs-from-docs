import { SetMetadata } from '@nestjs/common'
/* 

    O decorator @SetMetaData permite aplicar meta dados para a requisição
    e testar como teriamos em um ambiente consumindo e e enviando
    esses dados para uma rota. Aqui utilizaremos roles 
    para fazer uso do rolesguard (roles.guard.ts)

    Não é uma boa prática utilizar o decorator @SetMetaData dentro
    de uma controller, é melhor abstraí-la e criar um decorator
    customizado como fizemos aqui.

*/
export const Roles = (...roles: string[]) => SetMetadata('roles', roles)