import { Component, OnInit } from '@angular/core';
import {StaticPages} from '../static-pages';

@Component({
  selector: 'app-toolbar-menu',
  templateUrl: './toolbar-menu.component.html',
  styleUrls: ['./toolbar-menu.component.sass']
})
export class ToolbarMenuComponent implements OnInit {

  constructor() { }

  menuItems = StaticPages;

  ngOnInit(): void {
  }

}
