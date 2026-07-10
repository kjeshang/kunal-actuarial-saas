import { Directive, ElementRef, Host, HostListener, inject, output, OutputEmitterRef } from '@angular/core';
import currency from 'currency.js';

@Directive({
  selector: 'input[appCurrencyFormat]',
})
export class CurrencyFormat {

  // Inject the reference to the underlying native HTML <input> element
  private el: ElementRef = inject(ElementRef<HTMLInputElement>);

  // An output signal to emit the raw decimal number to your parent component
  public numericValueChange: OutputEmitterRef<number> = output<number>();

  /**
   * 1. When the user clicks into the text field (Focus)
   */
  @HostListener('focus')
  onFocus(): void {
    const rawValue: string = this.el.nativeElement.value;

    // Use currency.js to safely extract the value
    const parsed: currency = currency(rawValue);

    // Strip the formatting characters so the user can easily type numbers
    this.el.nativeElement.value = parsed.value > 0 ? parsed.value.toString() : '';
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

    // currency.js cleans up symbols, letters, and formatting variations automatically
    const parsed: currency = currency(rawValue);

    // Overwrite the input text box with a beautiful localized format (e.g., $250,000.00)
    this.el.nativeElement.value = parsed.format();

    // Emit the clean number up to your actuarial calculations state
    this.numericValueChange.emit(parsed.value);
  }

}
