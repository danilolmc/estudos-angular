import { Directive, ElementRef, Input } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';

const fn = (...args: any[]): any => args;

export interface IHasErrorState {
    ngControl: NgControl,
    elementRef: ElementRef,
    errorState: Observable<boolean>
}

export interface IHasFormAccessor<TValue> extends ControlValueAccessor {
    value: TValue;
    disabled: boolean;
    formAccessorHandleChange(): void
    formAccessorHandleFocus(): void
}

export type Constructor<T = {}> = new (...args: any[]) => T;

export const FormAccessorMixin = <TBase extends Constructor<IHasErrorState>, TValue>(base: TBase): Constructor<IHasFormAccessor<TValue>> & Constructor<IHasErrorState> & TBase => {

    @Directive()
    class FormAccessor extends base implements ControlValueAccessor {

        errorState!: Observable<boolean>;
        protected formState = new Subject<void>();
        protected _value!: TValue;
        protected _focused = false;
        protected _disabled = false;
        protected formAccessorChanged: (value: TValue) => void = fn;
        protected formAccessorTouched: () => void = fn;

        constructor(...args: any[]) {
            super(...args);

            if (this.ngControl) {
                this.ngControl.valueAccessor = this;
            }

            this.errorState = of();
        }

        @Input()
        set value(newValue: TValue) {
            if (newValue !== this._value) {
                this._value = newValue;
                this.formAccessorChanged(newValue)
            }
        }

        get value() {
            return this._value;
        }

        @Input()
        set disabled(disabled: boolean) {
            this._disabled = disabled;
        }
        get disabled() {
            return this._disabled;
        }


        writeValue(newValue: TValue): void {
            if (newValue !== this._value) {
                this._value = newValue;
                this.elementRef.nativeElement.value = newValue;
                this.formAccessorTouched()
            }
        }

        registerOnChange(fn: any): void {
            this.formAccessorChanged = (newValue: TValue) => {
                fn(newValue)
                this.formState.next();
            }

        }

        registerOnTouched(fn: () => void): void {
            this.formAccessorTouched = fn;
        }

        setDisabledState?(isDisabled: boolean): void {
            this._disabled = isDisabled;
            this.formState.next();
        }


        formAccessorHandleChange() {
            setTimeout(() => this.formState.next(), 0)
        }

        formAccessorHandleFocus() {
            this._focused = true;
            this.formState.next();
        }

    }

    return FormAccessor;
}














