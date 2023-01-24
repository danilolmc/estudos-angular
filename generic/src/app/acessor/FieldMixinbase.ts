import { Directive, ElementRef, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable } from "rxjs";
import { Constructor, FormAccessorMixin, IHasErrorState } from './form-acessor';

export class VFieldBase implements IHasErrorState {
    constructor(
        public ngControl: NgControl,
        public elementRef: ElementRef,
        public errorState: Observable<boolean>
    ) { }
}

@Directive()
export class VFieldMixinBase extends FormAccessorMixin<Constructor<VFieldBase>, string>(VFieldBase) {

    constructor(
        @Self()
        @Optional()
        public ngControl: NgControl,
        public elementRef: ElementRef,
    ) {
        super(ngControl, elementRef);
    }
}