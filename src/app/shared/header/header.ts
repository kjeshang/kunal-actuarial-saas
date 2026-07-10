import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private router: Router = inject(Router);

  /**
   * Get name of current route accessed by user.
   */
  get currentRoute(): string {
    let path = "";
    switch (this.router.url) {
      case "/":
        path = "Dashboard";
        break;
      case "/loan":
        path = "Loan"
        break;
      default:
        path = "";
    }
    return path;
  }
}
