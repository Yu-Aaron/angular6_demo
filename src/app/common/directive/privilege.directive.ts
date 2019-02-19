import { Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appPrivilege]'
})

export class PrivilegeDirective {

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) { }

    @Input() set appPrivilege(condition: string) {
        console.log(condition);

        for(let item of JSON.parse(localStorage.getItem('privilege'))){
            if(condition === item['name']){
                if(item['actionValue'] === 2 || item['actionValue'] === 1){
                    this.viewContainer.clear();
                }else if (item['actionValue'] === 30) {
                    this.viewContainer.createEmbeddedView(this.templateRef);

                }
            }
        }
    }
}

