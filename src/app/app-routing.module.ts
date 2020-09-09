import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// APP COMPONENTS
import { CheckboxComponent } from './checkbox/checkbox.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: CheckboxComponent
  },
  {
    path: 'checkbox',
    component: CheckboxComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: '**',
    component: CheckboxComponent
  }
];

@NgModule({
  declarations: [
    CheckboxComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
