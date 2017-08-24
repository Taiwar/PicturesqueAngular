import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { EditorModalComponent, PictureListComponent, PicturePreviewComponent } from './helpers';
import { ListErrorsComponent } from './list-errors.component';
import { ShowAuthedDirective } from './show-authed.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
  ],
  declarations: [
    EditorModalComponent,
    PictureListComponent,
    PicturePreviewComponent,
    ListErrorsComponent,
    ShowAuthedDirective
  ],
  exports: [
    EditorModalComponent,
    PictureListComponent,
    PicturePreviewComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ListErrorsComponent,
    RouterModule,
    ShowAuthedDirective
  ]
})

export class SharedModule {}
