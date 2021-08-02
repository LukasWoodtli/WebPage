import {Component, Input, OnInit} from '@angular/core';
import {TableOfContent} from './table-of-content';

@Component({
  selector: 'app-table-of-contents',
  templateUrl: './table-of-contents.component.html',
  styleUrls: ['./table-of-contents.component.sass']
})
export class TableOfContentsComponent implements OnInit {

  @Input() tableOfContent: TableOfContent = [];

  constructor() { }

  ngOnInit(): void {
  }

  showToc(): boolean {
   return this.tableOfContent.length > 0;
  }
}
