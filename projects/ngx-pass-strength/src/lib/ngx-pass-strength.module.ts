import { NgModule } from '@angular/core';
import { NgxPassStrengthComponent } from './ngx-pass-strength.component';
import { NgxPassStrengthService } from './ngx-pass-strength.service';

@NgModule({
  declarations: [NgxPassStrengthComponent],
  providers: [NgxPassStrengthService],
  imports: [],
  exports: [NgxPassStrengthComponent]
})
export class NgxPassStrengthModule { }
