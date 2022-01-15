import {MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WsResponse} from '@nestjs/websockets';
import {DownloadProgress, queueDownload, resolveOutputDir} from "../services/downloader";
import {map, Observable, Subject} from "rxjs";
import * as path from "path";
import * as fs from "fs";


@WebSocketGateway({cors: true})
export class DlQueueGateway implements OnGatewayConnection {

    handleConnection(client: any, ...args: any[]): any {
        console.log(client.id);
    }

    @SubscribeMessage('queueDownload')
    handleMessage(@MessageBody() payload: any): Observable<WsResponse<any>> {
        //console.log(payload);

        const event = 'progress';

        let dlProgress$: Subject<DownloadProgress> = new Subject();

        queueDownload({
            ...payload, progressCallback: (v) => {
                dlProgress$.next(v);
            }
        });

        return dlProgress$.pipe(
            map(data => {
                let ret = {
                    event, data
                };
                console.log(11, ret);
                return ret;
            }),
        );
    }

    @SubscribeMessage('clearDownload')
    clearDownload(@MessageBody() payload: string) {
        console.log(payload);
        let filenameAbs = path.resolve(resolveOutputDir(), payload);
        console.log(filenameAbs);
        try{
            fs.unlinkSync(filenameAbs);
        }catch (e) {
            console.log(e);
        }
    }

}
