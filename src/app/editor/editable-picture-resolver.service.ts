import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Picture, PicturesService, UserService } from '../shared';

@Injectable()
export class EditablePictureResolver implements Resolve<Picture> {
  constructor(
    private picturesService: PicturesService,
    private router: Router,
    private userService: UserService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.picturesService.get(route.params['slug'])
      .map(
        picture => {
          if (this.userService.getCurrentUser().username === picture.author.toString()) {
            return picture;
          } else {
            this.router.navigateByUrl('/');
          }

        }
      )
      .catch((err) => this.router.navigateByUrl('/'));

  }
}
