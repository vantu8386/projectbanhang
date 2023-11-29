import { Controller, Post, Body } from "@nestjs/common";
import { MediaService } from "./media.service";
import { CreateMediaDto } from "./DTO/createMedia.dto";

@Controller("/api/v1/media")
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}

    @Post()
    cteateMedia(@Body() media: CreateMediaDto){
        return this.mediaService.createMedia(media)
    }
}