import { Component, OnInit } from '@angular/core';
import {MarkdownService} from "ngx-markdown";

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.sass']
})
export class ResumeComponent implements OnInit {

  constructor(private markdownService: MarkdownService) { }

  ngOnInit(): void {

    this.markdownService.renderer.table = (header, body) => {
      return '<div class="mat-table">' +
      '<div class="mat-header-row">' +
        header +
        '</div>' + body + '</div>';
    };

    this.markdownService.renderer.tablerow = (content: string) => {
      return '<div class="mat-row">' + content + '</div>';
    };
    this.markdownService.renderer.tablecell = (content: string, flags) => {
      return '<div class="mat-cell">' + content + '</div>';
    };
  }

}
