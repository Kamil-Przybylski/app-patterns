import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { authActions } from '@libs/ng/core/auth';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '@libs/ng/core/config';

@Component({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
  ],
  standalone: true,
  selector: 'dm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  #store = inject(Store);
  #config = inject(APP_CONFIG);
  #h = inject(HttpClient);

  logout() {
    this.#store.dispatch(authActions.logOut());
  }
  test() {
    this.#h.get(this.#config.apiUrl).subscribe((r) => console.log(r));
  }
}
