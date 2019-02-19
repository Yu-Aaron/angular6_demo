import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventLevel'
})
export class EventLevelPipe implements PipeTransform {

  transform(value: string): string {
    var map = {
        'REJECTBOTH': '阻断',
        'ERROR': '丢弃',
        'WARN': '警告',
        'INFO': '信息'
    };
    return map[value] || value;
  }

}

@Pipe({
  name: 'eventRiskLevel'
})
export class EventRiskLevelPipe implements PipeTransform {

  transform(value: string): string {
    var map = {
      'LOW': '低',
      'MEDIUM': '中',
      'HIGH': '高',
      'NONE': ''
  };
  return map[value] || value;
  }

}

@Pipe({
  name: 'toHex'
})
export class ToHexPipe implements PipeTransform {

  transform(value: any): any {
    var hexChar = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
      return value ? value.map(function (byte) {
          return hexChar[(byte >> 4) & 0x0f] + hexChar[byte & 0x0f];
      }).join(' ') : '';
  }

}

@Pipe({
  name: 'protocolDetail'
})
export class ProtocolDetailPipe implements PipeTransform {

  transform(value: any): any {
    return value ? value.replace(/,/g, ', ') : '';
  }

}
