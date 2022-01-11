import {Controller, Get, Query} from '@nestjs/common';
import YouTube from 'youtube-sr'
import {from, map, Observable, of} from "rxjs";

@Controller('search')
export class SearchController {

    @Get()
    search(@Query() query: {q: string}): Observable<any[]> {
        let q = query.q;

        if (YouTube.validate(q, 'VIDEO')) {
            return from(YouTube.getVideo(q)).pipe(map(value => [value]));
        }else{
            return from(YouTube.search(q, { type: 'video' }));
        }
    }

}
