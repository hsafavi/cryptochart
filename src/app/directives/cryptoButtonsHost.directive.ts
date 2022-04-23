import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[cryptoButtons]'
})
export class ButtonsDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
