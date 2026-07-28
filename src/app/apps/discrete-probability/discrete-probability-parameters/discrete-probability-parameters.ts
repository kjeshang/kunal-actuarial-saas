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
  imports: [MatExpansionModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule],
  templateUrl: './discrete-probability-parameters.html',
  styleUrl: './discrete-probability-parameters.css',
})
export class DiscreteProbabilityParameters {
  private fb: FormBuilder = inject(FormBuilder);

  probabilityParametersForm: FormGroup = this.fb.group({
    probabilityDistribution: ["", Validators.required]
  });

  /**
   * When probability distribution is selected from the respective dropdown, add the parameters form group that reflects the selected distribution.
   */
  onSelectProbabilityDistribution(): void {
    const probabilityDistribution: string = this.probabilityParametersForm.get("probabilityDistribution")?.value;
    if(!isNil(probabilityDistribution)) {
      switch(probabilityDistribution) {
        case "binomial":
          
          break;
        case "uniform":

          break;
        case "geometric":

          break;
        case "poisson":

          break;
        case "negative-binomial":

          break;
        default:
          break;
      }
    }
  }
}
