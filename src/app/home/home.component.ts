import { Component, OnInit } from '@angular/core';

import { PictureListConfig, TagsService, UserService } from '../shared';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private tagsService: TagsService,
    private userService: UserService
  ) {}

  isAuthenticated: boolean;
  listConfig: PictureListConfig = new PictureListConfig();
  tags: Array<string> = [];
  tagsLoaded = false;

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
      }
    );

    this.setListTo('all');

    this.tagsService.getAll()
      .subscribe(tags => {
        this.tags = tags;
        this.tagsLoaded = true;
      });
  }

  setListTo(type: string = '', filters: Object = {}) {
    //  set the list object
    this.listConfig = {type: type, filters: filters};
  }
}
