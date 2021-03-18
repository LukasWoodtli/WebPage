import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar-menu',
  templateUrl: './toolbar-menu.component.html',
  styleUrls: ['./toolbar-menu.component.sass']
})
export class ToolbarMenuComponent implements OnInit {

  constructor() { }

  menuItems: string[] = [
    'Home',
    'Resume',
    'Skills',
    'Books',
    'Courses',
    'Projects',
    'Blog',
    'Contact'];

  ngOnInit(): void {
  }

}
