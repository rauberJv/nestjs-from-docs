import { Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Put, Query, Redirect } from "@nestjs/common";
import { CreateCatDto } from "./dto/create-cat.dto";
import { CatsService } from "./cats.service";
import { Cat } from "./interfaces/cat.interface";

/*
    Passar um parâmetro para 
    o decorator de controller define
    um "prefixo" para as rotas,
    assim não terá de repetir 'cats' em todos
    Get, Post, Put,..
*/
@Controller('cats')
export class CatsController {
    /*
        A utilização do decorator @Injetable() 
        em cats.service.ts combinado com o 
        moderador private no constructor 
        permite que a variável catsService abaixo
        seja declarara e inicializada, também utilizada
        dentro do escopo da classe
    */
    constructor(private catsService: CatsService) {}
    
    /* 
        O nest associa que um decorator de método HTTP (Get,Post,..)
        sem parâmetros, terá como rota o parâmetro informado no 
        decorator @Controller

        Se fosse passado um parâmetro e ficasse por exemplo @Get('type')
        a rota para acessar o método findAll abaixo seria /cats/type
    */
    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll()
    }

    /*
        O decorator @HttpCode permite informar
        o código de retorno desejado para um método/rota
        
        O decorator @Header permite informar 
        um par de chave/valor que retornara no header da requisição

        O decorator @Body permite acessar
        os dados passados no body da requisição HTTP
    */

    @Post()
    @HttpCode(204)
    @Header('Cache-Control', 'none')
    @Header('Qualquer', 'Coisa')
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto)
    }

    /* 
        Podemos utilizar * como um coringa na rota
        assim qualquer rota que de match com 
        /cats/ca*t sera executada, por exemplo
        /cats/ca1t, /cats/ca1231t, /cats/ca_t
    */
    @Get('ca*t')
    wildCat(): string {
        return 'You found an wild cat!'
    }

    /*
        O decorator @Redirect redireciona a rota
        /cats/redirectcat para a rota http://localhost:3000/cats
        com um status code de 301
        
        Caso o redirecionamento seja dinâmico e não estático
        você pode utilizar um redirect dentro do método 
        como feito abaixo, onde se o parâmetro querycat for != 1
        a rota /cats/redirectcat sera redirecionada para 
        a url informada com o statusCode informado
    */

    @Get('redirectcat')
    @Redirect('http://localhost:3000/cats', 301)
    redirectCat(@Query('querycat') queryCat){
        if(queryCat && queryCat !== '1') {
            return { url: `https://google.com/search?q=${queryCat}`}
        }
    }  

    /* 
        Para passar parametros na rota,
        voce utiliza de :parametro como feito abaixo
        com o id

        Utilizando o decorator @Params() voce pode acessar
        o parametro informado na rota

        E possivel fazer uma especie de destruct no params,
        alterando os parametros do metodo findOne() para 
        @Param('id') id: string

        Assim sera possivel se comunicar direto com o 
        parametro id sem ter de acessar o objeto params

    */

    @Get(':id')
    findOne(@Param() params): string {
        return `This action returns a #${params.id} cat`
    }

    /*
        Além de Promise, pode ser do tipo Observable
        que temos em RxJS

        Alterando, o tipo de retorno ficaria
        Observable<any[]>
    */
    @Get('asyncat')
    async asyncCat(): Promise<any[]> {
        return []
    }

    /*
        Existem decorators para todos metodos HTTP
        Podemos utilizar mais de 1 decorator como parâmetros
        de um método.

        Ao fazer um put para /cats/id iremos chamar o metodo
        abaixo, e também podemos acessar o corpo da requisição 
        através do decorator @Body
    */
    @Put(':id')
    update(@Param('id') id: string, @Body() createCatDto: CreateCatDto): string {
        return `This action updates a #${id} cat`
    }

    @Delete(':id')
    delete(@Param('id') id: string): string {
        return `This action delete the #${id} cat`
    }

}
