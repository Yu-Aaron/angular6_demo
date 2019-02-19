import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'deviceModel'
})

export class DeviceModelPipe implements PipeTransform{
    transform(key: string): string{
        if (key && key.indexOf(' / ', key.length - 3) !== -1) {
            return key.substring(0, key.length - 3);
        }
        if (key && key.indexOf(' / ') > 0) {
            var model = key.split(' / ');
            if (model[0] === model[1]) {
                return model[0];
            }
        }
        return key;
    }
}

