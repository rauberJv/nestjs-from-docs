import { HttpException, HttpStatus } from "@nestjs/common";

/*

    Podemos criar uma exception customizada apenas
    extendendo da classe HttpException e informando
    no construtor os valores de mensagem e status

*/

export class CatException extends HttpException {
    constructor() {
        super('M30w mE0W !@#', HttpStatus.FORBIDDEN)
    }
}

/* 
    Veja abaixo alguns tipos de exceptions
        
    -BadRequestException
    -UnauthorizedException
    -NotFoundException
    -ForbiddenException
    -NotAcceptableException
    -RequestTimeoutException
    -ConflictException
    -GoneException
    -HttpVersionNotSupportedException
    -PayloadTooLargeException
    -UnsupportedMediaTypeException
    -UnprocessableEntityException
    -InternalServerErrorException
    -NotImplementedException
    -ImATeapotException
    -MethodNotAllowedException
    -BadGatewayException
    -ServiceUnavailableException
    -GatewayTimeoutException
    -PreconditionFailedException

*/