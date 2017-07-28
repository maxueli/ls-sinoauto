import { Directive, Input, TemplateRef, ViewContainerRef, ElementRef } from '@angular/core';
import { style } from '@angular/animations';
@Directive({
    selector: '[searchselect]'
})
export class SearchSelectDirective {
    constructor(
        el: ElementRef,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ){
        el.nativeElement.style.backgroundColor = 'yellow';
        console.log(el);
    }
}