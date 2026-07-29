import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { isNil } from 'lodash';

@Component({
  selector: 'app-discrete-probability-parameters',
  imports: [MatExpansionModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, CommonModule],
  templateUrl: './discrete-probability-parameters.html',
  styleUrl: './discrete-probability-parameters.css',
})
export class DiscreteProbabilityParameters {
  private fb: FormBuilder = inject(FormBuilder);

  probabilityParametersForm: FormGroup = this.fb.group({
    probabilityDistribution: ["binomial", Validators.required],
    params: this.createBinomialFormGroup()
  });

  numColumns: number = 3;

  /**
   * Getter used to access the params form group easily from its parent form group (i.e., probabilityParametersForm).
   */
  get paramsFormGroup(): FormGroup {
    return this.probabilityParametersForm.get("params") as FormGroup;
  }

  /**
   * Adjust number of grid columns based on the total number of parameters related to the selected probability distribution (including the distribution dropdown selector).
   */
  get gridColumnsCSS(): string {
    let style: string = `grid grid-cols-1 sm:grid-cols-${this.numColumns} gap-4`;
    return style;
  }

  /**
   * When probability distribution is selected from the respective dropdown, add the parameters form group that reflects the selected distribution.
   */
  onSelectProbabilityDistribution(): void {
    const probabilityDistribution: string = this.probabilityParametersForm.get("probabilityDistribution")?.value;
    if (!isNil(probabilityDistribution)) {
      switch (probabilityDistribution) {
        case "binomial":
          this.probabilityParametersForm.setControl("params", this.createBinomialFormGroup());
          break;
        case "uniform":
          // Will add later
          break;
        case "geometric":
          this.probabilityParametersForm.setControl("params", this.createGeometricFormGroup());
          break;
        case "poisson":
          this.probabilityParametersForm.setControl("params", this.createPoissonFormGroup());
          break;
        case "negative-binomial":
          // Will add later
          break;
        default:
          break;
      }
    }
  }

  /**
   * Create parameters form group for the binomial probability distribution.
   */
  private createBinomialFormGroup(): FormGroup {
    this.numColumns = 3
    const parameters: FormGroup = this.fb.group({
      n: ["", Validators.required, Validators.min(1)],
      p: ["", Validators.required, Validators.min(0), Validators.max(1)]
    });
    return parameters;
  }

  /**
   * Create parameters form group for the geometric probability distribution.
   */
  private createGeometricFormGroup(): FormGroup {
    this.numColumns = 3
    const parameters: FormGroup = this.fb.group({
      n: ["", Validators.required, Validators.min(1)],
      p: ["", Validators.required, Validators.min(0.1), Validators.max(1)]
    });
    return parameters;
  }

  /**
   * Create parameters form group for the poisson probability distribution.
   */
  private createPoissonFormGroup(): FormGroup {
    this.numColumns = 3
    const parameters: FormGroup = this.fb.group({
      n: ["", Validators.required, Validators.min(1)],
      lambda: ["", Validators.required, Validators.min(0.1)]
    });
    return parameters;
  }
}
