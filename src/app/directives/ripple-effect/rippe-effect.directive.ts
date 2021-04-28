import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[rippleEffect]',
})
export class RippeEffectDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  currentElement: HTMLElement = this.elementRef.nativeElement;

  rippleContainer: HTMLDivElement;
  ripple: HTMLSpanElement;

  rippleContainerWidth = this.currentElement.offsetWidth;
  rippleContainerHeight = this.currentElement.offsetHeight;

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {



    if (this.rippleContainer) {
      this.renderer.removeChild(this.currentElement, this.currentElement.querySelector('.ripple-container'));

    }

    const rippleContainer = `
        <div class='ripple-container'>
          <span class='ripple'></span>
        </div>
    `;

    this.currentElement.insertAdjacentHTML('afterbegin', rippleContainer);

    this.rippleContainer = this.currentElement.querySelector('div');
    this.ripple = this.currentElement.querySelector('span');
    this.renderer.setStyle(this.rippleContainer,
      'position', 'absolute');

    this.renderer.setStyle(this.rippleContainer, 'width', `${this.rippleContainerWidth}px`);
    this.renderer.setStyle(this.rippleContainer, 'height', `${this.rippleContainerHeight}px`);

    this.renderer.setStyle(this.rippleContainer, 'margin', `0`);
    this.renderer.setStyle(this.rippleContainer, 'overflow', `hidden`);
    this.renderer.setStyle(this.rippleContainer, 'pointer-events', `none`);


    this.renderer.setStyle(this.ripple,
      'position', 'absolute');
    this.renderer.setStyle(this.ripple, 'background', 'rgba(255,255,255,.3)');
    this.renderer.setStyle(this.ripple, 'display', 'block');
    this.renderer.setStyle(this.ripple, 'width', '5px');
    this.renderer.setStyle(this.ripple, 'height', '5px');
    this.renderer.setStyle(this.ripple, 'border-radius', '50%');
    this.renderer.setStyle(this.ripple, 'transition', `.5s ease-in-out`);
    this.renderer.setStyle(this.ripple, 'left', `${(event.clientX - this.currentElement.offsetLeft)}px`);
    this.renderer.setStyle(this.ripple, 'top', `${(event.clientY - this.currentElement.offsetTop)}px`);
    this.renderer.setStyle(this.ripple, 'transform', `scale(40)`);

    setTimeout(() => {

      this.renderer.setStyle(this.ripple, 'opacity', `0`);
    }, 200);

    setTimeout(() => {
      this.renderer.removeChild(this.rippleContainer, this.ripple);
    }, 600);
  }
}
