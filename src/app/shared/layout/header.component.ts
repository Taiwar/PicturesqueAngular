import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  user: User = new User();

  constructor(
    private userService: UserService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document
  ) {}

  ngOnInit() {
    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.user = userData;
      }
    );
    const s = this._renderer2.createElement('script');
    s.text = `
            $(document).ready(function() {
              $(".button-collapse").sideNav({
                  menuWidth: 250,
                  draggable: true,
                  closeOnClick: true,
                }
              );
            });
    `;
    this._renderer2.appendChild(this._document.body, s);
  }

}
