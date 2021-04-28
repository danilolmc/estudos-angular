import { Component, DebugElement, ElementRef, NO_ERRORS_SCHEMA, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RippeEffectDirective } from './rippe-effect.directive';

@Component({
  template: "<button rippleEffect>Button</button>"
})
class ComponentTest { }

class ElementRefMock extends ElementRef {
  constructor() { super(undefined); }
}

class Renderer2Mock { }

describe('RippeEffectDirective', () => {
  let fixture: ComponentFixture<ComponentTest>;
  let directiveInstance: DebugElement[];

  beforeEach(() => {

    fixture = TestBed.configureTestingModule({
      declarations: [RippeEffectDirective, ComponentTest],
      providers: [
        Renderer2,
        { provide: ElementRef, useClass: ElementRefMock }
      ]
    }).createComponent(ComponentTest);

    fixture.detectChanges();
    directiveInstance = fixture.debugElement.queryAll(By.directive(RippeEffectDirective));
  })

  it('should click and create an create ripple elements', () => {
    directiveInstance[0].nativeElement.dispatchEvent(new Event('click'));

    // directiveInstance[0].nativeElement.click();
    fixture.detectChanges();
    expect(directiveInstance[0].nativeElement.querySelector('.ripple-container')).not.toBeNull();
  });
});
