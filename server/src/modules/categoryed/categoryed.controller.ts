import { Controller, Get, Param } from '@nestjs/common';
import { CategoryedService } from './categoryed.services';

@Controller('/api/v1/categoryed')
export class CategoryedController {
    constructor(private readonly categoryedService: CategoryedService){}

    @Get()
    getCategoryed(){
        return this.categoryedService.getCategoryed()
    }

    @Get("/:id")
    getByIdCategoryed(@Param("id") id: string){
        return this.categoryedService.getByIdcategoryed(Number(id));
    }
}


