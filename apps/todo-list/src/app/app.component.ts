import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'nx-angular-nest-root',
  template: `App is alive! <router-outlet /> `,
})
export class AppComponent {}
