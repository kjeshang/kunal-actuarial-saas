import { Directive, ElementRef, HostListener, inject, output, OutputEmitterRef } from '@angular/core';

@Directive({
  selector: 'input[appInterestRateFormat]',
})
export class InterestRateFormat {
  // Inject the reference to the underlying native HTML <input> element
  private el: ElementRef = inject(ElementRef<HTMLInputElement>);

  // An output signal to emit the raw decimal percentage to your parent component
  public numericValueChange: OutputEmitterRef<number> = output<number>();

  /**
   * 1. When the user clicks into the text field (Focus)
   */
  @HostListener('focus')
  onFocus(): void {
    const rawValue: string = this.el.nativeElement.value;

    // Strip out the '%' sign and any accidental letters so the user gets clean numbers to edit
    const cleanDigits: string = rawValue.replace(/[^0-9.]/g, '');
    const parsedValue: number = parseFloat(cleanDigits);

    // Show raw numbers for editing, or empty if it's not a valid number/zero
    this.el.nativeElement.value = (!isNaN(parsedValue) && parsedValue > 0) ? parsedValue.toString() : '';
  }

  /**
   * 2. When the user clicks away from the text field (Blur)
   */
  @HostListener('blur')
  onBlur(): void {
    const rawValue: string = this.el.nativeElement.value;

    // Handle an empty input block gracefully
    if (rawValue.trim() === '') {
      this.numericValueChange.emit(0);
      return;
    }

    // Isolate the raw numbers and parse to a float
    const cleanDigits: string = rawValue.replace(/[^0-9.]/g, '');
    const parsedValue: number = parseFloat(cleanDigits);

    if (isNaN(parsedValue) || parsedValue <= 0) {
      this.el.nativeElement.value = '';
      this.numericValueChange.emit(0);
      return;
    }

    // Overwrite the input text box with exactly 4 decimal places and a trailing percentage flag (e.g., 5.2500%)
    this.el.nativeElement.value = `${parsedValue.toFixed(4)}%`;

    // Emit the clean number up to your actuarial calculation engine state
    this.numericValueChange.emit(parsedValue);
  }
}
