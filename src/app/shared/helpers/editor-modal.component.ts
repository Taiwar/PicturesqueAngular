import { Component, EventEmitter, forwardRef, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Picture, PicturesService } from '../';
import { DOCUMENT } from '@angular/common';
import { MaterializeAction, toast } from 'angular2-materialize';

@Component({
  selector: 'app-editor-modal',
  templateUrl: './editor-modal.component.html',
  styleUrls: ['./editor-modal.component.css']
})

export class EditorModalComponent implements OnInit {
  @Input() picture: Picture;
  pictureForm: FormGroup;
  tagField = new FormControl();
  errors: Object = {};
  isSubmitting = false;
  modalActions = new EventEmitter<string|MaterializeAction>();

  constructor(
    @Inject(forwardRef(() => PicturesService)) private picturesService: PicturesService,
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
  }

  ngOnInit() {
    this.pictureForm.patchValue(this.picture);
    const s = this._renderer2.createElement('script');
    s.text = `
            $(document).ready(function(){
              $('.modal').modal({
                  dismissible: true,
                  opacity: .3,
                  inDuration: 300,
                  outDuration: 200,
                  startingTop: '4%',
                  endingTop: '10%',
                }
              );
              Materialize.updateTextFields();
              $('#updateButton').click(function(){
                  $('#editor-modal').modal('close');
                }
              )
            });
    `;
    this._renderer2.appendChild(this._document.body, s);
  }

  addTag() {
    // retrieve tag control
    const tag = this.tagField.value;
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
        picture => {
          toast('Successfully edited picture', 3000);
        },
        err => {
          this.errors = err;
          toast(err, 3000);
        }
      );
    this.isSubmitting = false;
  }

  updatePicture(values: Object) {
    (<any>Object).assign(this.picture, values);
  }
}
