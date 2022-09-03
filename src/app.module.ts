import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { functionalLogger } from './middlewares/functional.logger.middleware';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
/* 
  
  Um guard pode ser executado a nivel de modulo
  sendo assim, o mesmo será aplicado para todos 
  as controllers e metodos abaixo do modulo em
  que o guard foi chamado

  Dentro do imports fazemos a importação do modulo
  do mongoose para que ele possa ser corretamente 
  injetado e utilizado dentro da aplicação Nest
  Diferente de cats.module.ts, aqui nos declaramos
  a inicialização do banco de dados apontando seu
  caminho driver:host:databasename

  É possível utilizar multiplas conexões de bancos
  em algumas aplicações pode ser necessario, então seria 
  feito da seguinte forma 
  MongooseModule.forRoot('mongodb://localhost/test',{connectionName:'[nome_conexao]'})
  No caso de ser utilizado da forma acima, então onde é chamado o .forFeature devera ficar
  MongooseModule.forFeature([{name: Cat.name, schema: CatSchema}], '[nome_conexao]')
  
*/

@Module({
  imports: [CatsModule, MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
})
export class AppModule implements NestModule {

  /*

    A configuração de um middleware é feita da forma a seguir
    utiliza-se do consumer para aplicar o Middleware, passando o 
    Middleware a ser aplicato e para quais rotas deve ser utilizado
    
    Obs: Para utilizar o Middleware, o módulo deve
    implementar o NestModule

    Podemos limitar um middleware para apenas um metodo request 
    de uma rota. Assim, o forRoutes() ficaria da seguinte forma
    se aplicado somente para o metodo Get

    .forRoutes({ path: 'cats', method: RequestMethod.GET })

    Para fazer um middleware funcionar em todas as rotas de uma
    controller, utilizariamos assim o .forRoutes()

    .forRoutes(CatsController)

    A propriedade .exclude() permite informar uma rota da qual
    não desejamos ter a interferência do Middleware
  */

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, functionalLogger)
      .exclude({
        path: 'cats', method: RequestMethod.GET
      })
      .forRoutes('cats')
  }
}
