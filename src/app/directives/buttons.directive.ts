import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appButtons]'
})
export class ButtonsDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
