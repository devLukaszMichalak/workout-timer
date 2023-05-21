import { Directive, ElementRef, NgZone, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appResize]'
})
export class ResizeDirective implements OnDestroy {
  constructor(private elementRef: ElementRef, private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('resize', this.onResize);
    });
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    this.ngZone.run(() => {
      window.dispatchEvent(new Event('resize'));
    });
  };
}
