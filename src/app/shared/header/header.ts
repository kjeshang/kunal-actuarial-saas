import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { SaaSApp } from '../models';
import { saasApps } from '../saas-app.configuration';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private router: Router = inject(Router);
  saasApps: SaaSApp[] = saasApps;

  /**
   * Get name of current route accessed by user.
   */
  get currentRoute(): string {
    let path = "";
    if(this.router.url === "/") {
      path = "Dashboard";
    }
    else {
      for(const item of saasApps) {
        if(this.router.url === item.route) {
          path = item.title;
        }
      }
    }
    // switch (this.router.url) {
    //   case "/":
    //     path = "Dashboard";
    //     break;
    //   case "/loan":
    //     path = "Loan Amortization";
    //     break;
    //   default:
    //     path = "";
    // }
    return path;
  }
}
