import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPassStrengthComponent } from './ngx-pass-strength.component';
import { NgxPassStrengthService } from './ngx-pass-strength.service';

@NgModule({
  declarations: [NgxPassStrengthComponent],
  providers: [NgxPassStrengthService],
  imports: [CommonModule],
  exports: [NgxPassStrengthComponent]
})
export class NgxPassStrengthModule { }
