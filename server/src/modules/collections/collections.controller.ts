import { Controller, Get, Param } from "@nestjs/common";
import { CollectionsService } from "./collections.service";

@Controller("/api/v1/collections")
export class CollectionsController {
    constructor(private readonly collectionService: CollectionsService){}

    @Get()
    getCollection() {
        return this.collectionService.getCollection()
    }

    @Get("/:id")
    getByIdCollection(@Param("id") id: string){
        return this.collectionService.getByIdCollection(Number(id))
    }

    @Get("/idCategory/:idCategory")
    getAllCollectionsWithIdCategory(@Param("idCategory") idCategory: string){
        return this.collectionService.getAllCollectionsWithIdCategory(Number(idCategory))
    }
}