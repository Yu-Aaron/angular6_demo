import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'riskLevel'
})
export class RiskLevelPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let map = {
      'LOW': '低',
      'MEDIUM': '中',
      'HIGH': '高',
      'NONE': ''
    };
    return map[value] || value;
  }

}
