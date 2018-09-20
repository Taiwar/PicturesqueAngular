import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { PictureModule } from './picture/picture.module';
import { AuthModule } from './auth/auth.module';
import { EditorModule } from './editor/editor.module';
import { HomeModule } from './home/home.module';
import { SettingsModule } from './settings/settings.module';
import {
  ApiService,
  PicturesService,
  AuthGuard,
  FooterComponent,
  HeaderComponent,
  JwtService,
  SharedModule,
  TagsService,
  UserService,
} from './shared';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    MaterializeModule,
    BrowserModule,
    PictureModule,
    AuthModule,
    EditorModule,
    HomeModule,
    rootRouting,
    SharedModule,
    SettingsModule,
    BrowserAnimationsModule
  ],
  providers: [
    ApiService,
    PicturesService,
    AuthGuard,
    JwtService,
    TagsService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
