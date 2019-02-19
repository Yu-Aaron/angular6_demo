import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SseService {
    sse: any;
    version = '2.2.7-javascript';
    contentType = 'application/json';
    uuid = 0;
    url: string;
    baseUrl = '/sse/UPDATE?';
    deviceEmit = new EventEmitter();

    constructor() {
    }

    createObservableSse(url: string): Observable<any> {
        this.sse = new EventSource(url); //连接sse服务器
        return new Observable(   //返回一个流
            observer => {
                // sse接收到消息时，发射下一个元素
                this.sse.onmessage = (event) => observer.next(event.data);
                // sse出问题时，流抛出异常
                this.sse.onerror = (event) => observer.error(event);
                // sse关闭时，流发出结束的信号
                this.sse.onclose = (event) => observer.complete();
            }
        );
    }

    startSse() {
        this.url = this.baseUrl + 'X-Atmosphere-tracking-id=' + this.uuid;
        this.url += '&X-Atmosphere-Framework=' + this.version;
        this.url += '&Content-Type=' + this.contentType;
        this.url += '&X-Atmosphere-Transport=polling';
        this.url = this.prepareURL(this.url);
        this.createObservableSse(this.url).subscribe((data: string) => {
            console.log('sse', data);
            let sseData = JSON.parse(data);
            switch(sseData.sseType) {
                case 'INCIDENT':
                    break;
                case 'EVENT':
                    break;
                case 'ALARM':
                    break;
                case 'TODOLIST':
                    break;
                case 'PORT':
                    break;
                case 'PORT_STATUS':
                    break;
                case 'INTRUSION_DETECTION':
                    break;
                case 'LEARNING':
                    break;
                case 'LEARNED_IP_MAC':
                    break;
                case 'LEARNING_RESULT':
                    break;
                case 'DEVICE_UPDATE':
                    break;
                case 'DEVICE_MODE_UPDATE':
                    break;
                case 'DPI_UPGRADE_STATE':
                    break;
                case 'TOPOLOGY_DISCOVERY':
                    break;
                case 'INFO_COLLECTION_DPI':
                case 'INFO_COLLECTION_MW':
                    if (sseData.content.action === 'CONF_BACKUP') {
                        this.deviceEmit.emit(sseData);
                    }
                    break;
                case 'NEW_FOUND_DEVICE':
                    break;
                default:
            }
        });
    }

    stopSse() {
        this.sse.close();
    }

    prepareURL(url) {
        // Attaches a time stamp to prevent caching
        let ts = new Date().getTime();
        let ret = url.replace(/([?&])_=[^&]*/, '$1_=' + ts);
        return ret + (ret === url ? (/\?/.test(url) ? '&' : '?') + '_=' + ts : '');
    }

}
