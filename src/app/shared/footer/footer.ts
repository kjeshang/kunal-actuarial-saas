import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  imports: [MatDividerModule, MatIconModule, MatButtonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer { }
