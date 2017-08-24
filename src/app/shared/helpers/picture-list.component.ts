import { Component, Input } from '@angular/core';

import { Picture, PictureListConfig } from '../models';
import { PicturesService } from '../services';

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html'
})
export class PictureListComponent {
  constructor (
    private picturesService: PicturesService
  ) {}

  @Input() limit: number;
  @Input()
  set config(config: PictureListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  query: PictureListConfig;
  results: Picture[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  runQuery() {
    this.loading = true;
    this.results = [];

    // Create limit and offset filter (if necessary)
    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset =  (this.limit * (this.currentPage - 1));
    }

    this.picturesService.query(this.query)
      .subscribe(data => {
        this.loading = false;
        this.results = data.pictures;

        // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
        this.totalPages = Array.from(new Array(Math.ceil(data.picturesCount / this.limit)), (val, index) => index + 1);
      });
  }
}
