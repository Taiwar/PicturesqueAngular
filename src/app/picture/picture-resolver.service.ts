import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Picture, PicturesService } from '../shared';

@Injectable()
export class PictureResolver implements Resolve<Picture> {
  constructor(
    private picturesService: PicturesService,
    private router: Router,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.picturesService.get(route.params['slug'])
      .catch((err) => this.router.navigateByUrl('/'));

  }
}
