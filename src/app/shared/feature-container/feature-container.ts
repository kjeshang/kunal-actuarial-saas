import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-feature-container',
  imports: [Header, Footer],
  templateUrl: './feature-container.html',
  styleUrl: './feature-container.css',
})
export class FeatureContainer {}
