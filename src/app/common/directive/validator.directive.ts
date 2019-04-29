import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appValidator]',
  providers: [
    {
      provide: NG_VALIDATORS, useExisting: ValidatorDirective, multi: true
    }
  ]
})
export class ValidatorDirective {

  @Input('appValidator') value: string;
  constructor() {
  }
  
  // validate (control: AbortController): { [key: string]: any } | null {
  //   const validateIp = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
  //   const validateMac = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/;
  //   switch (this.value) {
  //     case 'ip':
  //         return control['value'] === '0.0.0.0/0' ? null : (validateIp.exec(control['value']) ? null : {validate: true});
  //     case 'mac':
  //         return validateMac.exec(control['value']) ? null : {validate: true};
  //   }
  // }

}
