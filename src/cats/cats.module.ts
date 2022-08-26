import { Module } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";
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
*/
@Module({
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService]
})
export class CatsModule {}

/* TIP
    To create a module using the CLI, simply execute the $ nest g module cats command.
*/