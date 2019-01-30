import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SseService {

    sse: any;

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
}
