import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UniqueIdService } from '../../services/unique-id/unique-id.service';

@Component({
  selector: 'app-yes-no-button-group',
  templateUrl: './yes-no-button-group.component.html',
  styleUrls: ['./yes-no-button-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => YesNoButtonGroupComponent)
    }
  ]
})
export class YesNoButtonGroupComponent implements OnInit, ControlValueAccessor {

  @Input() disabled = false;
  @Input() value: string = null;
  @Input() label = '';
  @Output() valueChange = new EventEmitter();

  id: string = null;

  options = YesNoButtonGroupOptions;
  onChange = (value: string) => { };
  onTouched = () => { };

  constructor(uniqueIdService: UniqueIdService){
    this.id = uniqueIdService.generateUniqueIdWithPrefix('yes-no-button-group');
  }

  writeValue(value: string): void {
    this.value = value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {
  }

  activate(value: 'yes' | 'no'): void {
    this.value = value;
  }

}

enum YesNoButtonGroupOptions {
  YES = 'yes',
  NO = 'no'
}
