import { Component } from '@angular/core';
import { FeatureContainer } from '../../../shared/feature-container/feature-container';
import { SaaSApp } from '../../../shared/models';
import { DashboardCard } from '../dashboard-card/dashboard-card';
import { saasApps } from '../../../shared/saas-app.configuration';
import { MatDividerModule } from '@angular/material/divider';
import { uniq } from 'lodash';

@Component({
  selector: 'app-dashboard-page',
  imports: [FeatureContainer, DashboardCard, MatDividerModule],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
})
export class DashboardPage {
  saasApps: SaaSApp[] = saasApps;

  get saasAppCategories(): string[] {
    let categories: string[] = uniq(saasApps.map((item: SaaSApp) => item.category));
    return categories;
  }
}
