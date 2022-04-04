import { Directive, HostListener } from '@angular/core';

interface KeyboardEventTypes {

    ArrowUp: () => void;
    ArrowDown: () => void;
    ArrowLeft: () => void;
    ArrowRight: () => void;
}

@Directive({
    selector: '[appKm]'
})
export class KeyboardManagerDirective {

    private keyBoardEvents: KeyboardEventTypes = {
        ArrowUp: () => console.log('up'),
        ArrowDown: () => console.log('down'),
        ArrowLeft: () => console.log('left'),
        ArrowRight: () => console.log('right')
    };

    @HostListener('keyup', ['$event'])
    keyBoardManagerKeys(event: KeyboardEvent): void {
        const funcionToCall = this.keyBoardEvents[event.key] || (() => { });
        funcionToCall();
    }
}
