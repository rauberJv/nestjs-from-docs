import { Injectable } from "@nestjs/common";
import { Cat } from "./interfaces/cat.interface";

@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [
        { name: 'Cinza', age: 19, breed: 'vira-lata' },
        { name: 'Abel', age: 17, breed: 'sem-pata' },
        { name: 'Habibi', age: 28, breed: 'puro-sangue-arabe' },
    ]

    create(cat: Cat) {
        this.cats.push(cat)
    }

    findAll(): Cat[] {
        return this.cats
    }
}