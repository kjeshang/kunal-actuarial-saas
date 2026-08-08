import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { DiscreteProbabilityDistributionTable, DiscreteProbabilityTableConfiguration } from '../discrete-probability.models';

@Component({
  selector: 'app-discrete-probability-table',
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatMenuModule, MatProgressBarModule],
  templateUrl: './discrete-probability-table.html',
  styleUrl: './discrete-probability-table.css',
})
export class DiscreteProbabilityTable {
  @Input() discreteProbabilityConfiguration!: DiscreteProbabilityTableConfiguration[];
  @Input() discreteProbabilityDistributionTable!: DiscreteProbabilityDistributionTable[];

  showProgressBar: boolean = false;

   /**
   * Get name of column to be populated in table.
   */
  get displayedColumns(): string[] {
    const list: string[] = [];
    for (const item of this.discreteProbabilityConfiguration) {
      list.push(item.name);
    }
    return list;
  }
}
