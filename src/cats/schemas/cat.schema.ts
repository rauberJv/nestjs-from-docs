import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CatDocument = Cat & Document

/* 
    Um schema é criado para poder mapear uma entidade
    do banco de dados relacional ou não relacional.
    Aqui utiliza um banco mongoose então é feito o 
    mapeamento com decorators do mongoose

    O decorator Schema() declara que essa classe se 
    refere ao document Cat do banco de dados
    O decorator Schema() pode ter algumas propriedades
    opcionais passadas por parametro, basta checar
    na documentação para ver

    O decorator @Prop() se refere a uma propriedade 
    de um document do mongoDB.
    O decorator @Prop() pode receber um tipo por
    parametro para explicitar qual é o tipo daquela
    propriedade mapeada.

    Exportamos a classe Cat e a constante CatSchema 
    para ser utilizada nas services e trabalhar
    o mongoose

*/

@Schema()
export class Cat { 
    @Prop([String])
    name: string

    @Prop()
    age: number

    @Prop()
    breed: string
}

export const CatSchema = SchemaFactory.createForClass(Cat)