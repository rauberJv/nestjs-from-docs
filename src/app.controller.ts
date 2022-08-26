import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// A Controller recebe a requisição do lado do cliente
// faz suas solicitações e devolve(ou não) um retorno 
// Para criar uma controller utilizamos classes e decorators(@)
// decorators associam classes com dados do metadata(GET,POST,PUT,..) e permitem o roteamento
// O roteamento é quem define qual método de uma controller será chamado
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

/* TIP
For quickly creating a CRUD controller with the validation built-in, you may use the CLI's CRUD generator: nest g resource [name].  
*/
