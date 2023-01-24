import { Directive, forwardRef, HostListener, HostBinding, Input } from '@angular/core';
import { VFieldMixinBase } from '../acessor/FieldMixinbase';
 

@Directive({
  selector: '[vInput]',
  providers: [
    {
      provide: VFieldMixinBase,
      useExisting: forwardRef(() => InputDirective)
    }
  ]
})
export class InputDirective extends VFieldMixinBase {

  private _readonly : boolean | null = null;

  @Input('disabled')
  set controlDisabled(disabled: true) {
    this.disabled = disabled;
  }
  
  @HostBinding('attr.disabled')
  get controlDisable() {
    return (this.disabled && !this.controlValue) || null;
  }
  
  @Input()
  set readonly(readonly: boolean | null) {
    this._readonly = readonly || null;
  }

  get readonly() {
    return this._readonly;
  }

  @HostBinding('attr.value')
  get controlValue() {
    return this.value;
  }

  @HostBinding('attr.readonly')
  get controlReadonly() {
    return (this.disabled && !!this.controlValue) || this._readonly;
  }

  @HostBinding('attr.class')
  inputClasses = 'v-input';

  @HostListener('ngModelChange')
  controlChange() {
    this.formAccessorHandleChange();
  }

  @HostListener('input', ['$event.target'])
  controlInput({ value }: HTMLInputElement) {
    this.value = value
  }

}
