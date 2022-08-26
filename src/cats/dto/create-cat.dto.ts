/* 
    Uma DTO(Data Transfer Object) é muito utilizada no 
    TypeScript para definir o formato que os dados 
    são passados através da internet

    O ideal talvez seja criar um DTO com nome mais 
    generalizado para que possa ser utilizado mais 
    de uma vez e não precisar repetir código
*/

export class CreateCatDto {
    name: string
    age: number
    breed: string
}