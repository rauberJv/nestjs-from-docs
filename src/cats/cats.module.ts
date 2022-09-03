import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";
import { Cat, CatSchema } from "./schemas/cat.schema";
/*
    O decorator @Module mantem controle das 
    controllers e services utilizadas no sistema
    Para manter principios de SOLID é utilizado um 
    module para cada feature.

    Veja que em app.module.ts este módulo é importado
    A propriedade controllers cuida das controllers
    A propriedade providers cuida das services
    a propriedade exports é utilizada para exportar um 
    modulo para outros modulos

    Dentro do imports fazemos a declaração do modulo
    Mongoose e atribuimos ele a uma feature. É importante
    fazer essa definição pois passamos para a aplicação
    tratar e injetar corretamente as classes como fizemos
    no arquivo cats.service.ts, assim a aplicação cuidara
    da parte do decorator @InjectModel().
*/
@Module({
    imports: [MongooseModule.forFeature([{name: Cat.name, schema:CatSchema}])],
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService]
})
export class CatsModule {}

/* TIP
    To create a module using the CLI, simply execute the $ nest g module cats command.
*/