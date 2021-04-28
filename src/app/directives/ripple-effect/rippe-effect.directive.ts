import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[rippleEffect]',
})
export class RippeEffectDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

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

    let rippleContainerStyle = `
      position: absolute;
      width: ${this.rippleContainerWidth}px;
      height: ${this.rippleContainerHeight}px;
      pointer-events: none;
    `;

    let rippleStyle = `
      position: absolute;
      background: rgba(255,255,255,.4);
      display: block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      transition: .5s ease-in-out
    `;


    this.currentElement.insertAdjacentHTML('afterbegin', rippleContainer);

    this.rippleContainer = this.currentElement.querySelector('div');
    this.ripple = this.currentElement.querySelector('span');

    this.renderer.setAttribute(this.rippleContainer, 'style', rippleContainerStyle);
    this.renderer.setAttribute(this.ripple, 'style', rippleStyle);

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
