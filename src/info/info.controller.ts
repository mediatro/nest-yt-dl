import {Controller, Get, Query} from '@nestjs/common';
import {from, Observable} from "rxjs";
import ytdl = require('ytdl-core');

@Controller('info')
export class InfoController {

    @Get()
    get(@Query() query: {v: string}): Observable<any> {
        let v = query.v;
        let videoUrl = `https://www.youtube.com/watch?v=${v}`;

        return from(ytdl.getInfo(videoUrl));
    }


}
