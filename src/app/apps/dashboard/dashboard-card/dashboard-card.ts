import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SaaSApp } from '../../../shared/models';
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-dashboard-card',
  imports: [MatCardModule, MatIconModule, RouterLink, MatDividerModule],
  templateUrl: './dashboard-card.html',
  styleUrl: './dashboard-card.css',
})
export class DashboardCard {
  @Input() app!: SaaSApp;
}
