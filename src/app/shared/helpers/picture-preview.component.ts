import { Component, Input } from '@angular/core';

import { Picture } from '../models';

@Component({
  selector: 'app-picture-preview',
  templateUrl: './picture-preview.component.html'
})
export class PicturePreviewComponent {
  @Input() picture: Picture;
}
