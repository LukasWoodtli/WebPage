import { Component, OnInit } from '@angular/core';
import {STATIC_PAGES} from '../static-pages';

@Component({
  selector: 'app-toolbar-menu',
  templateUrl: './toolbar-menu.component.html',
  styleUrls: ['./toolbar-menu.component.sass']
})
export class ToolbarMenuComponent implements OnInit {
  menuItems = STATIC_PAGES;

  constructor() { }

  ngOnInit(): void {
  }

}
