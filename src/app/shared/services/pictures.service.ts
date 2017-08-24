import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Picture, PictureListConfig } from '../models';

@Injectable()
export class PicturesService {
  constructor(private apiService: ApiService) {
  }

  query(config: PictureListConfig): Observable<{ pictures: Picture[], picturesCount: number }> {
    // Convert any filters over to Angular's URLSearchParams
    const params: URLSearchParams = new URLSearchParams();

    Object.keys(config.filters)
      .forEach((key) => {
        params.set(key, config.filters[key]);
      });

    return this.apiService
      .get(
        '/pictures' + ((config.type === 'feed') ? '/feed' : ''),
        params
      ).map(data => data);
  }

  get (slug): Observable<Picture> {
    return this.apiService.get('/pictures/' + slug)
      .map(data => data.picture);
  }

  destroy(slug) {
    return this.apiService.delete('/pictures/' + slug);
  }

  save(picture): Observable<Picture> {
    // If we're updating an existing picture
    if (picture.slug) {
      return this.apiService.put('/pictures/' + picture.slug, {picture: picture})
        .map(data => data.picture);

      // Otherwise, create a new picture
    } else {
      return this.apiService.post('/pictures/', {picture: picture})
        .map(data => data.picture);
    }
  }

  updateFolder(): Observable<Boolean> {
    return this.apiService.get('/utils/update_folder/')
      .map(data => data.success);
  }
}

