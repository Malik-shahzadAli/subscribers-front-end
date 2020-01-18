import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribersComponent } from './subscribers.component';



import { RouterModule } from '@angular/router';
import { PartialsModule } from '../../partials/partials.module';
@NgModule({
  declarations: [SubscribersComponent],
  imports: [
    CommonModule,
    PartialsModule,
    RouterModule.forChild([
      {
        path: '',
        component: SubscribersComponent
      },
    ]),
  ],

})
export class SubscribersModule { }
