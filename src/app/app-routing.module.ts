import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps'

// APP COMPONENTS
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import { UserComponent } from './user/user.component';
import { SharingComponent } from './sharing/sharing.component';

// SHARED COMPONENTS
import { HeaderComponent } from './shared/header.component';
import { FooterComponent } from './shared/footer.component';

// ROUTING
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
    ListComponent,
    MapComponent,
    UserComponent,
    SharingComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
