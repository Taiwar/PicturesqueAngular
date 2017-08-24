import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PictureComponent } from './picture.component';
import { PictureResolver } from './picture-resolver.service';
import { SharedModule } from '../shared';

const pictureRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'picture/:slug',
    component: PictureComponent,
    resolve: {
      picture: PictureResolver
    }
  }
]);

@NgModule({
  imports: [
    pictureRouting,
    SharedModule
  ],
  declarations: [
    PictureComponent,
  ],

  providers: [
    PictureResolver
  ]
})
export class PictureModule {}
