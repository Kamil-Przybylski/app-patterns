import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  standalone: true,
  selector: 'dm-root',
  template: `<router-outlet /> `,
})
export class AppComponent {}
