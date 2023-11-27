import { Component } from '@angular/core';
import { CoreModule } from './core/core.module';

@Component({
  imports: [CoreModule],
  standalone: true,
  selector: 'dm-root',
  template: `<router-outlet /> `,
})
export class AppComponent {}
