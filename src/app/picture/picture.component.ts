import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import {
  Picture,
  PicturesService,
  User,
  UserService
} from '../shared';

@Component({
  selector: 'app-picture-page',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {
  picture: Picture;
  currentUser: User;
  canModify: boolean;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private picturesService: PicturesService,
    private router: Router,
    private userService: UserService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document
  ) { }

  ngOnInit() {
    // Retrieve the prefetched picture
    this.route.data.subscribe(
      (data: { picture: Picture }) => {
        this.picture = data.picture;
      }
    );

    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        this.canModify = (this.currentUser.username === '' + this.picture.author);
      }
    );

    const s = this._renderer2.createElement('script');
    s.text = `
              $(document).ready(function(){
                $('.materialboxed').materialbox();
              });
        `;

    this._renderer2.appendChild(this._document.body, s);
  }

  deletePicture() {
    this.isDeleting = true; this.picturesService.destroy(this.picture.slug)
      .subscribe(
        success => {
          this.router.navigateByUrl('/');
        }
      );
  }

}
