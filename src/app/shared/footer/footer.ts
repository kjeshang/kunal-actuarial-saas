import { Component, Signal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-footer',
  imports: [MatDividerModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected currentYear: Signal<number> = signal(new Date().getFullYear());
}
