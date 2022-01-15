import {Controller, Get, Param, Res} from '@nestjs/common';
import * as path from "path";
import {resolveOutputDir} from "../services/downloader";
import * as express from 'express';
import * as fs from "fs";

@Controller('download')
export class DownloadController {

    @Get(':filename')
    getOne(
        @Param() params,
        @Res() response: express.Response,
    )  {
        let filename = params.filename;
        let filenameAbs = path.resolve(resolveOutputDir(), filename);
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
