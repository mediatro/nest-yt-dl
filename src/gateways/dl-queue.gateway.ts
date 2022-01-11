import {MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WsResponse} from '@nestjs/websockets';
import {DownloadProgress, queueDownload} from "../services/downloader";
import {from, map, Observable, Subject} from "rxjs";

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

    queueDownload({...payload, progressCallback: (v) => {
        dlProgress$.next(v);
    }});

    return dlProgress$.pipe(
      map(data => {
          let ret = {
              event, data
          };
          //console.log(11,ret);
          return ret;
      }),
    );
  }

}
