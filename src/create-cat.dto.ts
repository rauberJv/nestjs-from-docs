/* 
    Uma DTO(Data Transfer Object) é muito utilizada no 
    TypeScript para definir o formato que os dados 
    são passados através da internet
*/

export class CreateCatDto {
    name: string
    age: number
    breed: string
}