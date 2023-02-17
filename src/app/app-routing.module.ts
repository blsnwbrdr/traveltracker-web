import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';

// APP COMPONENTS
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import { UserComponent } from './user/user.component';

// SHARED COMPONENTS
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

// ROUTING
const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'map',
    component: MapComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: '**',
    component: ListComponent,
  },
];

@NgModule({
  declarations: [
    ListComponent,
    MapComponent,
    UserComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule,
    GoogleMapsModule,
    RouterModule.forRoot(routes, {}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
