import {Controller, Get, Param, Query, Res} from '@nestjs/common';
import * as path from "path";
import {resolveOutputDir} from "../services/downloader";
import * as express from 'express';
import * as fs from "fs";

@Controller('download')
export class DownloadController {

    @Get()
    getOne(
        @Param() params,
        @Query() query,
        @Res() response: express.Response,
    )  {
        //let filename = params.filename;
        let filename = query.filename;
        let filenameAbs = path.resolve(resolveOutputDir(), filename);
        console.log('serving', filenameAbs);

        response.header('Access-Control-Allow-Origin', '*');
        response.download(filenameAbs, err => {
            try{
                console.log('cleared', filenameAbs);
                fs.unlinkSync(filenameAbs);
            }catch (e) {
                console.log(e, err);
            }
        });
    }
}
