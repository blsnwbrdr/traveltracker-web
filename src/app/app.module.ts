import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// ROUTING MODULE
import { AppRoutingModule } from './app-routing.module';

// APP COMPONENTS
import { AppComponent } from './app.component';
import { NavigationComponent } from './shared/navigation/navigation.component';

@NgModule({ declarations: [AppComponent, NavigationComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
