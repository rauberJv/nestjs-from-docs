import { Body, Controller, Delete, Get, Header, HttpCode, HttpException, HttpStatus, ImATeapotException, Param, ParseIntPipe, Post, Put, Query, Redirect, SetMetadata, UseFilters, UseGuards } from "@nestjs/common";
import { CreateCatDto } from "./dto/create-cat.dto";
import { CatsService } from "./cats.service";
import { Cat } from "./interfaces/cat.interface";
import { CatException } from "src/exceptions/cat.exception";
import { HttpExceptionFilter } from "src/exceptions/http-exception.filter";
import { RolesGuard } from "src/guards/roles.guard";
import { AuthGuard } from "src/guards/auth.guard";
import { Roles } from "src/decorators/roles.decorator";

/*
    Passar um parâmetro para 
    o decorator de controller define
    um "prefixo" para as rotas,
    assim não terá de repetir 'cats' em todos
    Get, Post, Put,..

    o decorator @UseGuards permite utilizar um guard
    em nivel de controller, ou método, ou global.
    Aplicando ele acima da classe, mantém ele no escopo
    da controller, sendo ativado em todos os métodos chamados
*/
@Controller('cats')
@UseGuards(RolesGuard)
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

        Como visto acima, o decorator @UseGuards faz o bind de um guard
        para um metodo, classe ou escopo global. Pode ser passado como 
        classe, ou como instância igual feito abaixo


    */
    @Get()
    // @UseGuards(new AuthGuard())
    @Roles('admin')
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
        @Param('id') id: string ou utilizar com o objeto params
        ficando da seguinte forma (@Param() params)

        Assim sera possivel se comunicar direto com o 
        parametro id sem ter de acessar o objeto params

        O parametro ParseIntPipe faz parte dos pipes do nest,
        sendo utilizado para fazer uma verificação se o parametro
        é do tipo requerido, caso contrário não irá executar o corpo
        do método.

        Veja o arquivo pipe.types.txt para ver mais tipos de pipes

    */

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): string {
        return `This action returns a #${id} cat`
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

    /*

        Na função abaixo podemos ver um retorno de HttpException
        para manusear erros na aplicação

    */

    @Get('errors/forbidden')
    async forbiddenRequest() {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }

    /*
        
        Na função abaixo podemos ver como fazer uma mensagem
        de retorno customizada, informando o status e o error
        que serão recebidos no body da requisição.

    */

    @Get('errors/customerror')
    async customErrorRequest() {
        throw new HttpException({
            status: HttpStatus.FORBIDDEN,
            error: 'This is a custom message'
        }, HttpStatus.FORBIDDEN)
    }

    /*
        Na função abaixo podemos ver como fazer uma 
        exception customizada. 
        Veja o arquivo cat.exception.ts para ver como
        é criado uma exception customizada.
    */

    @Get('errors/catexception')
    async catExceptionRequest() {
        // throw new ImATeapotException()
        throw new CatException()
    }

    /*

        O metodo abaixo mostra como carregarmos
        e utilizarmos um filtro de exception

        Veja o arquivo http-exception.filter.ts
        para entender como é feito

        O decorator @UseFilters permite caregarmos 
        um filtro na requisição

        Pode ser utilizado mais de 1 parametro no
        decorator @UseFilters() basta apenas passar
        como lista e separar por virgulas.

        Os Filtros de exceção podem ser utilizados no 
        contexto de uma controller passando antes da definição
        da classe o mesmo decorator utilizado abaixo.

        Pode tambem ser usado globalmente, utilizando a propriedade
        app.useGlobalFilters(new HttpExceptionFilter()) dentro do 
        arquivo main.ts
    */

    @Get('errors/exceptionfilter')
    @UseFilters(new HttpExceptionFilter())
    async exceptionFilter() {
        throw new CatException()
    }

    
}
