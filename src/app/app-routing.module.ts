import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CheckboxComponent } from './checkbox/checkbox.component';

const routes: Routes = [
  {
    path: '',
    component: CheckboxComponent
  },
  {
    path: '**',
    component: CheckboxComponent
  }
];

@NgModule({
  declarations: [
    CheckboxComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
