import {Component, computed, inject, Signal} from '@angular/core';
import {VerifyCodeComponent} from './Component/verify-code/verify-code.component';
import {SecureAccessService} from './Service/secure-access.service';
import {SetPasswordComponent} from './Component/set-password/set-password.component';

@Component({
  selector: 'app-secure-access-component',
  imports: [
    VerifyCodeComponent,
    SetPasswordComponent,
  ],
  templateUrl: './secure-access-component.component.html',
  styleUrl: './secure-access-component.component.css'
})
export class SecureAccessComponentComponent {

  private secureAccessService: SecureAccessService = inject(SecureAccessService);
  step: Signal <string> = computed((): string => this.secureAccessService.signal());

}
