import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// APP COMPONENTS
import { MapComponent } from './map/map.component';
import { ListComponent } from './list/list.component';
import { UserComponent } from './user/user.component';
import { SharingComponent } from './sharing/sharing.component';

// SHARED COMPONENTS
import { HeaderComponent } from './shared/header.component';
import { FooterComponent } from './shared/footer.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'sharing',
    component: SharingComponent
  },
  {
    path: '**',
    component: ListComponent
  }
];

@NgModule({
  declarations: [
    MapComponent,
    ListComponent,
    UserComponent,
    SharingComponent,
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
