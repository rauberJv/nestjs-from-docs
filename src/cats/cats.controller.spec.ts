import { Test } from "@nestjs/testing";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";


describe('Cats Controller', () => {
    let catsController: CatsController
    let catsService: CatsService

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [CatsController],
            providers: [CatsService]
        })
        .compile()

        catsService = moduleRef.get<CatsService>(CatsService)
        catsController = moduleRef.get<CatsController>(CatsController)
    })

    describe('findAll', () => {
        it('Should return an array of cats', async () => {
            const result = [{ name: 'Cat', age: 1, breed: 'street-cat' }]

            jest.spyOn(catsService, 'findAll').mockImplementation(() => result)

            expect(await catsController.findAll()).toBe(result)
        })
    })
})