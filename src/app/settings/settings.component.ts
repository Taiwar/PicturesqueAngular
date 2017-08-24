import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { toast, MaterializeAction } from 'angular2-materialize';

import { User, UserService } from '../shared';
import { PicturesService } from '../shared/services/pictures.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  user: User = new User();
  settingsForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private pictureService: PicturesService,
    private fb: FormBuilder,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document
  ) {
    // create form group using the form builder
    this.settingsForm = this.fb.group({
      username: '',
      email: '',
      password: ''
    });
    // Optional: subscribe to changes on the form
    // this.settingsForm.valueChanges.subscribe(values => this.updateUser(values));
  }

  ngOnInit() {
    // Make a fresh copy of the current user's object to place in editable form fields
    (<any>Object).assign(this.user, this.userService.getCurrentUser());
    // Fill the form
    this.settingsForm.patchValue(this.user);

    const s = this._renderer2.createElement('script');
    s.text = `
              $(document).ready(function() {
                Materialize.updateTextFields();
              });
        `;

    this._renderer2.appendChild(this._document.body, s);
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateUser(this.settingsForm.value);

    this.userService
      .update(this.user)
      .subscribe(
        updatedUser => this.router.navigateByUrl('/'),
        err => {
          this.errors = err;
          this.isSubmitting = false;
        }
      );
  }

  updateUser(values: Object) {
    (<any>Object).assign(this.user, values);
  }

  updateLocalPics() {
    this.pictureService.updateFolder().subscribe(
      success => {
        if (success) {
          toast('Successfully updated DB', 3000);
        } else {
          toast('Failed to update DB', 3000);
        }
      },
      err => {
        this.errors = err;
      }
    );
  }

}
