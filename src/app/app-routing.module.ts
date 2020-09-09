import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// APP COMPONENTS
import { ListComponent } from './list/list.component';
import { UserComponent } from './user/user.component';

// SHARED COMPONENTS
import { HeaderComponent } from './shared/header.component';
import { FooterComponent } from './shared/footer.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: '**',
    component: ListComponent
  }
];

@NgModule({
  declarations: [
    ListComponent,
    UserComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
