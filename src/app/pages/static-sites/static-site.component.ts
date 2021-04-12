import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MarkdownService} from 'ngx-markdown';
import {ActivatedRoute, Router} from '@angular/router';

class TocEntry {
  constructor(readonly level: number,
              readonly text: string,
              readonly anchor: string){}
}

@Component({
  selector: 'app-static-site',
  templateUrl: './static-site.component.html',
  styleUrls: ['./static-site.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class StaticSiteComponent implements OnInit {

  public pathToMdFile: string;

  public showToc = false;

  public tableOfContent: TocEntry[] = [];

  readonly metadataTags = ['Title:', 'slug:', 'save_as:', 'URL:'];


    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private markdownService: MarkdownService) {
  }

  ngOnInit(): void {
    this.configureMarkDownFileName();

    this.markdownService.renderer.heading = (text, level, raw) => {

      let anchorPrefix = this.markdownService.options.headerPrefix;
      anchorPrefix = anchorPrefix ? anchorPrefix : '';
      const anchor =  anchorPrefix  + raw.toLowerCase().replace(/[^\w]+/g, '-');
      this.tableOfContent.push(new TocEntry(level, raw, anchor));
      const headerTag = `<h${level} id='${anchor}'>${text}</h${level}>`;

      return headerTag;
    };

    this.markdownService.renderer.text = (text: string) => {
      if (text.trim() === '[TOC]') {
        this.showToc = true;
        return '';
      }

      if (this.isMetadataTag(text)) {
        console.log(`Warning removing meta data from Markdown file: ${text}`);
        return '';
      }

      return text;
    };

    this.markdownService.renderer.table = (header, body) => '<div class="mat-table">' +
        header +
        body + '</div>';

    let isFirstRow = true;
    this.markdownService.renderer.tablerow = (content: string) => {
      if (isFirstRow) {
        isFirstRow = false;
        return '<div class="mat-header-row">' + content + '</div>';
      }
      return '<div class="mat-row">' + content + '</div>';
    };

    this.markdownService.renderer.tablecell = (content: string, flags) => {
      if (flags.header) {
        return '<div class="mat-header-cell">' + content + '</div>';
      }
      return '<div class="mat-cell">' + content + '</div>';
    };
  }

  private configureMarkDownFileName(): void {
    const url = this.router.url.split('#')[0];
    this.pathToMdFile = `assets/pages/${url}.md`;
  }

  private isMetadataTag(text: string): boolean {
    for (const metadataTag of this.metadataTags) {
      if (text.trim().startsWith(metadataTag)) {
        return true;
      }
    }
    return false;
  }
}
