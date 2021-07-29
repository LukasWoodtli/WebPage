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

  private isFirstTableRow = true;

  constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private markdownService: MarkdownService) {
    this.isFirstTableRow = true;
    this.tableOfContent = [];
  }

  ngOnInit(): void {

    this.configureMarkDownFileName();

    this.markdownService.renderer.heading = (text, level, raw) =>
      this.renderHeading(text, level, raw);

    this.markdownService.renderer.text = (text: string ) => this.renderText(text);

    this.markdownService.renderer.table = (header, body) => this.renderTable(header, body);

    this.markdownService.renderer.tablerow = (content: string) => this.renderTableRow(content);

    this.markdownService.renderer.tablecell = this.renderTableCell;
  }

  private configureMarkDownFileName(): void {
    const url = this.router.url;
    this.pathToMdFile = this.getMarkdownFileNameFromRouteUrl(url);
  }

  private getMarkdownFileNameFromRouteUrl(url): string {
    const urlPart = url.split('#')[0];
    let filePath = 'assets/pages';
    if (!urlPart.startsWith('/')) {
      filePath += '/';
    }
    return `${filePath}${urlPart}.md`;
  }

  private renderHeading(text, level, raw): string {
    let anchorPrefix = this.markdownService.options.headerPrefix;
    anchorPrefix = anchorPrefix ? anchorPrefix : '';
    const anchor =  anchorPrefix  + raw.toLowerCase().replace(/[^\w]+/g, '-');
    this.tableOfContent.push(new TocEntry(level, raw, anchor));
    const headerTag = `<h${level} id='${anchor}'>${text}</h${level}>`;

    return headerTag;
  }

  private renderText(text: string): string {
    if (text.trim() === '[TOC]') {
      this.showToc = true;
      return '';
    }

    if (this.isMetadataTag(text)) {
      console.log(`Warning removing meta data from Markdown file: ${text}`);
      return '';
    }

    return text;
  }

  private renderTable(header, body): string {
    this.isFirstTableRow = true;
    return '<div class="mat-table">' + header + body + '</div>';
  }

    private renderTableRow(content: string) {
    if (this.isFirstTableRow) {
      this.isFirstTableRow = false;
      return '<div class="mat-header-row">' + content + '</div>';
    }
    return '<div class="mat-row">' + content + '</div>';
  }

  private renderTableCell(content: string, flags)  {
    if (flags.header) {
      return '<div class="mat-header-cell">' + content + '</div>';
    }
    return '<div class="mat-cell">' + content + '</div>';
  }

  private isMetadataTag(text: string): boolean {
    const textTrimmed = text.trim();

    const metadataTags = ['Title:', 'slug:', 'save_as:', 'URL:'];

    return metadataTags.some(x => textTrimmed.startsWith(x));
  }
}
