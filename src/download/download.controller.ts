import {Controller, Get, Param, Query, Req, Res} from '@nestjs/common';
import * as path from "path";
import {resolveOutputDir} from "../services/downloader";
import * as express from 'express';
import * as fs from "fs";
import * as MobileDetect from "mobile-detect";
import * as AdmZip from "adm-zip";



@Controller('download')
export class DownloadController {

    @Get()
    getOne(
        @Param() params,
        @Query() query,
        @Req() req: express.Request,
        @Res() res: express.Response,
    )  {
        //let filename = params.filename;
        let filename = query.filename;
        let filenameAbs = path.resolve(resolveOutputDir(), filename);
        console.log('serving', filenameAbs);

        let md = new MobileDetect(req.headers['user-agent']);
        let isIphone = md.is('iPhone');

        console.log('iphone', isIphone);

        //isIphone = true;
        let filenameAbsOrig = '';

        if(isIphone){
            let zip = new AdmZip();
            let zipPath = filenameAbs.replace(/\.[^.]+$/, '.zip');
            zip.addLocalFile(filenameAbs);
            zip.writeZip(zipPath);
            console.log('zip', filenameAbs, zipPath);
            filenameAbsOrig = filenameAbs;
            filenameAbs = zipPath;
        }

        res.header('Access-Control-Allow-Origin', '*');
        res.download(filenameAbs, err => {
            try{
                fs.unlinkSync(filenameAbs);
                console.log('cleared', filenameAbs);
                if(filenameAbsOrig != ''){
                    fs.unlinkSync(filenameAbsOrig);
                    console.log('cleared', filenameAbsOrig);
                }
            }catch (e) {
                console.log(e, err);
            }
        });
    }
}
