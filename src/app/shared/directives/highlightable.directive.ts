import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlightable]',
  standalone: true,
})
export class HighlightableDirective {
  constructor(public element: ElementRef) {}

  @HostListener('mouseenter') onEnter() {
    this.element.nativeElement.style.transform = 'scale(1.05)';
    this.element.nativeElement.style.boxShadow =
      'var(--primary-color) 0 0 10px';
    this.element.nativeElement.style.transition =
      'transform 300ms, box-shadow 300ms';
  }

  @HostListener('mouseleave') onLeave() {
    this.element.nativeElement.style.transform = 'scale(1)';
    this.element.nativeElement.style.boxShadow = 'none';
  }
}
