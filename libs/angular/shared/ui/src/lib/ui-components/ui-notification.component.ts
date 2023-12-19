import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ui-notification',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="t-flex t-text-error">
      @if (icon) {
      <mat-icon class="t-mr-3">{{ icon }}</mat-icon>
      }
      <div class="t-flex t-items-center">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiNotificationComponent {
  @Input() icon?: string;
}
