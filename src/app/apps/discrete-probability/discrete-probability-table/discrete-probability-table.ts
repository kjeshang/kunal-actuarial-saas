import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { DiscreteProbabilityDistributionTable, DiscreteProbabilityMetric, DiscreteProbabilityTableConfiguration } from '../discrete-probability.models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DiscreteProbabilityReportService } from '../discrete-probability-report-service/discrete-probability-report.service';

@Component({
  selector: 'app-discrete-probability-table',
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatMenuModule, MatProgressBarModule],
  templateUrl: './discrete-probability-table.html',
  styleUrl: './discrete-probability-table.css',
})
export class DiscreteProbabilityTable {
  @Input() discreteProbabilityConfiguration!: DiscreteProbabilityTableConfiguration[];
  @Input() discreteProbabilityDistributionParameters!: DiscreteProbabilityMetric[];
  @Input() discreteProbabilityDistributionMetrics!: DiscreteProbabilityMetric[];
  @Input() discreteProbabilityDistributionTable!: DiscreteProbabilityDistributionTable[];

  private discreteProbabilityReportService: DiscreteProbabilityReportService = inject(DiscreteProbabilityReportService);
  private _snackBar: MatSnackBar = inject(MatSnackBar);

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

  /**
   * On button click, asynchronously call function to export discrete probability distribution data into CSV.
   */
  async triggerExportToCSV(): Promise<void> {
    try {
      // Show Progress Bar
      this.showProgressBar = true;
      // Call Report Service Function to Export Discrete Probability Distribution Data to CSV
      await this.discreteProbabilityReportService.exportToCSV(
        this.discreteProbabilityDistributionParameters,
        this.discreteProbabilityDistributionMetrics,
        this.discreteProbabilityConfiguration,
        this.discreteProbabilityDistributionTable
      );
      // Show notification that CSV has been exported
      this._snackBar.open("Discrete Probability Distribution Table Exported to CSV!", "Dismiss", {
        duration: 3000,
        verticalPosition: "top"
      });
      // Hide Progress Bar
      this.showProgressBar = false;
    }
    catch (error: unknown) {
      // In the event an error was thrown by the report service function, show a notification indicating the error message.
      if (error instanceof Error) {
        this._snackBar.open(`${error.message}`, "Dismiss", {
          duration: 5000,
          verticalPosition: "top"
        });
        // Hide Progress Bar
        this.showProgressBar = false;
      }
    }
  }

  /**
   * On button click, asynchronously call function to generate discrete probability distribution data into PDF.
   */
  async triggerGeneratePDF(): Promise<void> {
    try {
      // Show Progress Bar
      this.showProgressBar = true;
      // Call Report Service Function to Generate Discrete Probability Distribution Data to PDF
      await this.discreteProbabilityReportService.generatePDF(
        this.discreteProbabilityDistributionParameters,
        this.discreteProbabilityDistributionMetrics,
        this.discreteProbabilityConfiguration,
        this.discreteProbabilityDistributionTable
      );
      // Hide Progress Bar
      this.showProgressBar = false;
    }
    catch (error: unknown) {
      // In the event an error was thrown by the report service function, show a notification indicating the error message.
      if (error instanceof Error) {
        this._snackBar.open(`${error.message}`, "Dismiss", {
          duration: 5000,
          verticalPosition: "top"
        });
        // Hide Progress Bar
        this.showProgressBar = false;
      }
    }
  }
}
