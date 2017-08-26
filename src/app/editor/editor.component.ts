import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Picture, PicturesService } from '../shared';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor.component.html'
})

export class EditorComponent implements OnInit {
  picture: Picture = new Picture();
  pictureForm: FormGroup;
  tagField = new FormControl();
  errors: Object = {};
  isSubmitting = false;

  constructor(
    private picturesService: PicturesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document
  ) {
    // use the FormBuilder to create a form group
    this.pictureForm = this.fb.group({
      title: '',
      description: '',
      image: '',
    });
    // Optional: subscribe to value changes on the form
    // this.pictureForm.valueChanges.subscribe(value => this.updatePicture(value));
  }

  ngOnInit() {
    // If there's a picture prefetched, load it
    this.route.data.subscribe(
      (data: {picture: Picture}) => {
        if (data.picture) {
          this.picture = data.picture;
          this.pictureForm.patchValue(data.picture);
        }
      }
    );

    const s = this._renderer2.createElement('script');
    s.text = `
              $(document).ready(function() {
                Materialize.updateTextFields();
              });
        `;

    this._renderer2.appendChild(this._document.body, s);
  }

  addTag() {
    // retrieve tag control
    const tag = this.tagField.value.slice(0, -1);
    // only add tag if it does not exist yet
    if (this.picture.tagList.indexOf(tag) < 0) {
      this.picture.tagList.push(tag);
    }
    // clear the input
    this.tagField.reset('');
  }

  removeTag(tagName: string) {
    this.picture.tagList = this.picture.tagList.filter((tag) => tag !== tagName);
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updatePicture(this.pictureForm.value);

    // post the changes
    this.picturesService
      .save(this.picture)
      .subscribe(
        picture => this.router.navigateByUrl('/picture/' + picture.slug),
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
  }

  updatePicture(values: Object) {
    (<any>Object).assign(this.picture, values);
  }
}
