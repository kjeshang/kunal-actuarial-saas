import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { isNil } from 'lodash';
import { DiscreteProbabilityStore } from '../discrete-probability.store';
import { BinomialParameters, DiscreteUniformParameters, GeometricParameters, NegativeBinomialParameters, PoissonParameters } from '../discrete-probability.models';

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
    parameters: undefined
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
  get params(): FormGroup {
    return this.probabilityParametersForm.get("parameters") as FormGroup;
  }

  /**
   * Adjust number of grid columns based on the total number of parameters related to the selected probability distribution (including the distribution dropdown selector).
   */
  get gridColumnsCSS(): string {
    let style: string = "";
    if (this.probabilityDistribution === 'negative-binomial') {
      style = "pb-1 grid grid-cols-1 sm:grid-cols-4 gap-4";
    }
    else if (this.probabilityDistribution === 'geometric') {
      style = "pb-1 grid grid-cols-1 sm:grid-cols-3 gap-4";
    }
    else {
      style = "pb-1 grid grid-cols-1 sm:grid-cols-2 gap-4";
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
          this.probabilityParametersForm.setControl("parameters", this.createBinomialFormGroup());
          break;
        case "discrete-uniform":
          this.probabilityParametersForm.setControl("parameters", this.createDiscreteUniformFormGroup());
          break;
        case "geometric":
          this.probabilityParametersForm.setControl("parameters", this.createGeometricFormGroup());
          break;
        case "poisson":
          this.probabilityParametersForm.setControl("parameters", this.createPoissonFormGroup());
          break;
        case "negative-binomial":
          this.probabilityParametersForm.setControl("parameters", this.createNegativeBinomialFormGroup());
          break;
        default:
          break;
      }
      this.discreteProbabilityStore.setProbabilityDistribution(probabilityDistribution);
    }
  }

  /**
   * Detect the unique parameter inputs for the respective probability distribution and save the values to the signal store.
   * @param probabilityDistribution 
   */
  saveParameters(probabilityDistribution: string): void {
    let parameters: BinomialParameters | DiscreteUniformParameters | GeometricParameters | PoissonParameters | NegativeBinomialParameters | undefined = undefined;
    switch (probabilityDistribution) {
      case "binomial":
        parameters = {
          n: this.params.get("n")?.valid ? this.params.get("n")?.value : 0,
          p: this.params.get("p")?.valid ? this.params.get("p")?.value : 0
        };
        // parameters = { n: this.params.get("n")?.value, p: this.params.get("p")?.value };
        break;
      case "discrete-uniform":
        parameters = {
          a: this.params.get("a")?.valid ? this.params.get("a")?.value : 0,
          b: this.params.get("b")?.valid ? this.params.get("b")?.value : 0
        };
        // parameters = { a: this.params.get("a")?.value, b: this.params.get("b")?.value };
        break;
      case "geometric":
        parameters = {
          version: this.params.get("version")?.valid ? this.params.get("version")?.value : 0,
          n: this.params.get("n")?.valid ? this.params.get("n")?.value : 0,
          p: this.params.get("p")?.valid ? this.params.get("p")?.value : 0
        };
        // parameters = { version: this.params.get("version")?.value, n: this.params.get("n")?.value, p: this.params.get("p")?.value };
        break
      case "poisson":
        parameters = { n: this.params.get("n")?.value, lambda: this.params.get("lambda")?.value };
        break;
      case "negative-binomial":
        parameters = { type: this.params.get("type")?.value, n: this.params.get("n")?.value, r: this.params.get("r")?.value, p: this.params.get("p")?.value };
        break;
      default:
        parameters = undefined;
        break;
    }
    this.discreteProbabilityStore.setParameters(parameters);
    console.log(this.discreteProbabilityStore.parameters());
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
      version: ["", Validators.required],
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
