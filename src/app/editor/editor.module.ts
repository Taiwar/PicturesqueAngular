import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EditorComponent } from './editor.component';
import { EditablePictureResolver } from './editable-picture-resolver.service';
import { AuthGuard, SharedModule } from '../shared';

const editorRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editor/:slug',
    component: EditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      picture: EditablePictureResolver
    }
  }
]);

@NgModule({
  imports: [
    editorRouting,
    SharedModule
  ],
  declarations: [
    EditorComponent
  ],
  providers: [
    EditablePictureResolver
  ]
})
export class EditorModule {}
