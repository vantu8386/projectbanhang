import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoryed } from "./entity/categoryed.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryedService {
    constructor(@InjectRepository(Categoryed) private categoryedRepository: Repository<Categoryed>){}

    async getCategoryed(): Promise<Categoryed []> {
        try {
            return this.categoryedRepository.find({
                order: {
                    idCategoryed: 'ASC',
                  },
                }
            )
        } catch (error) {
            // console.log("error:", error)
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }
    }

    async getByIdcategoryed(id: number): Promise<Categoryed>{
        try {
            return this.categoryedRepository.findOne({where: {idCategoryed: id}})
        } catch (error) {
            // console.log("error:", error)
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }
    }
}