import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MarkdownService} from "ngx-markdown";

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class ResumeComponent implements OnInit {

  constructor(private markdownService: MarkdownService) { }

  ngOnInit(): void {

    this.markdownService.renderer.table = (header, body) => {
      return '<div class="mat-table">' +
        header +
        body + '</div>';
    };

    let isFirstRow = true;
    this.markdownService.renderer.tablerow = (content: string) => {
      if (isFirstRow) {
        isFirstRow = false;
        return '<div class="mat-header-row">' + content + '</div>';
      }
      return '<div class="mat-row">' + content + '</div>';
    };
    this.markdownService.renderer.tablecell = (content: string, flags) => {
      if (flags.header)
        return '<div class="mat-header-cell">' + content + '</div>';
      return '<div class="mat-cell">' + content + '</div>';
    };
  }

}
