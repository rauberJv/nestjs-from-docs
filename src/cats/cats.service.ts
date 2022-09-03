import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCatDto } from "./dto/create-cat.dto";
import { Cat, CatDocument } from "./schemas/cat.schema";

@Injectable()
export class CatsService {
    /*
        O decorator @InjectModel() no constructor de uma
        classe permite que sejam acessadas e realizadas 
        operações em um document do banco de dados mongo.
        
        Nesse caso utilizamos o document Cat que criamos
        no arquivo cat.schema.ts e injetamos para utilizar
        suas funcionalidades de CRUD dentro da CatsService

        Podemos injetar diretamente a conexão com o mongo,
        utilizando da seguinte forma 
        @InjectConnection() private connection: Connection
        Assim podemos executar operações direto na conexao
        com o banco de dados e não diretamente em um documento

        É possível injetar uma connection passando o nome da 
        conexão criada no AppModule(app.module.ts linha 24)
        Sendo assim ficaria 
        @InjectConnection('[nome_conexao]') private connection: Connection 
    */
    constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) { }

    private readonly cats: Cat[] = [
        { name: 'Cinza', age: 19, breed: 'vira-lata' },
        { name: 'Abel', age: 17, breed: 'sem-pata' },
        { name: 'Habibi', age: 28, breed: 'puro-sangue-arabe' },
    ]

    create(createCatDto: CreateCatDto): Promise<Cat> {
        const newCat = new this.catModel(createCatDto)
        return newCat.save()
    }

    findAll(): Promise<Cat[]> {
        return this.catModel.find().exec()
    }
}