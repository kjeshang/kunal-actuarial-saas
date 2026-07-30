import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { isNil } from 'lodash';
import { DiscreteProbabilityStore } from '../discrete-probability.store';

@Component({
  selector: 'app-discrete-probability-parameters',
  imports: [MatExpansionModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, CommonModule],
  templateUrl: './discrete-probability-parameters.html',
  styleUrl: './discrete-probability-parameters.css',
})
export class DiscreteProbabilityParameters implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  discreteProbabilityStore = inject(DiscreteProbabilityStore);

  probabilityParametersForm: FormGroup = this.fb.group({
    probabilityDistribution: [this.discreteProbabilityStore.probabilityDistribution(), Validators.required],
    params: undefined
  });

  /**
   * Getter used to easily access probabilityDistribution form control value from form group (i.e., probabilityParametersForm).
   */
  get probabilityDistribution(): string {
    return this.probabilityParametersForm.get("probabilityDistribution")?.value as string;
  }

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
    let style: string = "";
    if(this.probabilityDistribution === 'negative-binomial') {
      style = "grid grid-cols-1 sm:grid-cols-4 gap-4";
    }
    else {
      style = "grid grid-cols-1 sm:grid-cols-2 gap-4";
    }
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
        case "discrete-uniform":
          this.probabilityParametersForm.setControl("params", this.createDiscreteUniformFormGroup());
          break;
        case "geometric":
          this.probabilityParametersForm.setControl("params", this.createGeometricFormGroup());
          break;
        case "poisson":
          this.probabilityParametersForm.setControl("params", this.createPoissonFormGroup());
          break;
        case "negative-binomial":
          this.probabilityParametersForm.setControl("params", this.createNegativeBinomialFormGroup());
          break;
        default:
          break;
      }
    }
  }

  /**
   * On component load, determine parameters form group based on default probability distribution selected.
   */
  ngOnInit(): void {
    this.onSelectProbabilityDistribution();
  }

  /**
   * Create parameters form group for the binomial probability distribution.
   */
  private createBinomialFormGroup(): FormGroup {
    const parameters: FormGroup = this.fb.group({
      n: ["", [Validators.required, Validators.min(1)]],
      p: ["", [Validators.required, Validators.min(0), Validators.max(1)]]
    });
    return parameters;
  }

  /**
   * Create parameters form group for the discrete uniform probability distribution.
   */
  private createDiscreteUniformFormGroup(): FormGroup {
    const parameters: FormGroup = this.fb.group({
      a: ["", [Validators.required]],
      b: ["", [Validators.required]]
    });
    return parameters;
  }

  /**
   * Create parameters form group for the geometric probability distribution.
   */
  private createGeometricFormGroup(): FormGroup {
    const parameters: FormGroup = this.fb.group({
      n: ["", [Validators.required, Validators.min(1)]],
      p: ["", [Validators.required, Validators.min(0), Validators.max(1)]]
    });
    return parameters;
  }

  /**
   * Create parameters form group for the poisson probability distribution.
   */
  private createPoissonFormGroup(): FormGroup {
    const parameters: FormGroup = this.fb.group({
      n: ["", [Validators.required, Validators.min(1)]],
      lambda: ["", [Validators.required, Validators.min(1)]]
    });
    return parameters;
  }

  private createNegativeBinomialFormGroup(): FormGroup {
    const parameters: FormGroup = this.fb.group({
      type: ["", Validators.required],
      n: ["", [Validators.required, Validators.min(1)]],
      r: ["", [Validators.required, Validators.min(1)]],
      p: ["", [Validators.required, Validators.min(0), Validators.max(1)]]
    });
    return parameters;
  }
}
