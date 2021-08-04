import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StaticSiteComponent} from './static-site.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MarkdownService} from 'ngx-markdown';
import {NO_ERRORS_SCHEMA} from '@angular/core';


class MockRenderer {
}

class MarkdownServiceMock {
  renderer: MockRenderer = new MockRenderer();
}

describe('StaticSiteComponent', () => {
  let component: StaticSiteComponent;
  let componentProto: any;
  let fixture: ComponentFixture<StaticSiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [StaticSiteComponent],
      providers: [{provide: MarkdownService, useClass: MarkdownServiceMock}],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    /* Inspired by https://stackoverflow.com/a/61658365
       Careful: fields are undefined when getting prototype! */
    componentProto = Object.getPrototypeOf(component);
  });

  describe('getMarkdownFileNameFromRouteUrl', () => {
    const getMarkdownFileNameFromRouteUrlTestData = [
      {url: '/index', expectedFilePath: 'assets/pages/index.md'},
      {url: '/resume', expectedFilePath: 'assets/pages/resume.md'},
      {url: '/skills', expectedFilePath: 'assets/pages/skills.md'},
      {url: '/books', expectedFilePath: 'assets/pages/books.md'},
      {url: '/courses', expectedFilePath: 'assets/pages/courses.md'},
      {url: '/projects', expectedFilePath: 'assets/pages/projects.md'},
      {url: '/contact', expectedFilePath: 'assets/pages/contact.md'}
    ];
    getMarkdownFileNameFromRouteUrlTestData.forEach(testCase => {
      it(`Filename for ${testCase.url}`, () => {
        expect(componentProto.getMarkdownFileNameFromRouteUrl(testCase.url))
          .toBe(testCase.expectedFilePath);
      });
    });
  });

  describe('renderHeading', () => {
    it('Programming Languages', () => {
      componentProto.markdownService = {options: {headerPrefix: ''}};

      const toc = [];
      componentProto.tableOfContent = toc;

      expect(componentProto.renderHeading(
        'Programming Languages',
        1,
        'Programming Languages',))
        .toBe('<h1 id=\'programming-languages\'>Programming Languages</h1>');
      expect(toc.length).toBe(1);
      expect(toc[0].level).toBe(1);
      expect(toc[0].text).toBe('Programming Languages');
      expect(toc[0].anchor).toBe('programming-languages');
    });
  });

  describe('renderText', () => {
    it('TOC', () => {
      expect(componentProto.renderText('[TOC]'))
        .toBe('');
    });

    it('filter metadata tag', () => {
      expect(componentProto.renderText('URL:'))
        .toBe('');
    });

    it('keep normal text', () => {
      expect(componentProto.renderText('Hello there'))
        .toBe('Hello there');
    });
  });


  describe('renderTable', () => {
    it('check table', () => {
      expect(componentProto.renderTable('hello', 'world'))
        .toBe('<div class="mat-table">helloworld</div>');
    });
  });

  describe('renderTableRow', () => {
    it('check row', () => {
      // First row
      componentProto.isFirstTableRow = true;
      expect(componentProto.renderTableRow(
        'first-row-source-code'))
        .toBe('<div class="mat-header-row">first-row-source-code</div>');
      // Second row
      expect(componentProto.isFirstTableRow).toBeFalse();
      expect(componentProto.renderTableRow(
        'second-row-source-code'))
        .toBe('<div class="mat-row">second-row-source-code</div>');
      expect(componentProto.isFirstTableRow).toBeFalse();
    });
  });

  describe('renderTableCell', () => {
    const renderTableCellTestData = [
      {text: 'Occupation', headerFlag: true, expectedOutput: '<div class="mat-header-cell">Occupation</div>'},
      {text: '2010 - 2015', headerFlag: false, expectedOutput: '<div class="mat-cell">2010 - 2015</div>'},
      {
        text: 'Senior firmware/software engineer, Kaba AG, Wetzikon', headerFlag: false,
        expectedOutput: '<div class="mat-cell">Senior firmware/software engineer, Kaba AG, Wetzikon</div>'
      }];

    renderTableCellTestData.forEach(testCase => {
      it(`text: ${testCase.text}`, () => {
        const flags = {header: testCase.headerFlag};
        const cellText = testCase.text;
        const expectedOutput = testCase.expectedOutput;
        expect(componentProto.renderTableCell(cellText, flags)).toBe(expectedOutput);
      });
    });
  });

  describe('isMetadataTag', () => {
    const isMetadataTagTestData = [
      {tag: 'Title:', expectedResult: true},
      {tag: 'title:', expectedResult: true},
      {tag: 'slug:', expectedResult: true},
      {tag: 'abc:', expectedResult: false}];

    isMetadataTagTestData.forEach((testCase) => {
      it(`metadata tag: ${testCase.tag}`, () => {
        expect(componentProto.isMetadataTag(testCase.tag)).toBe(testCase.expectedResult);
      });
    });
  });

  describe('renderLink', () => {
    const renderLinkTestData = [
      { href: '{filename}/pages/skills.md', text: 'skills', expectedLinkHtml: '<a href="skills">skills</a>'},
      { href: '{filename}/pages/resume.md', text: 'resume', expectedLinkHtml: '<a href="resume">resume</a>'},
      { href: '{filename}/pages/books.md', text: 'knowledge', expectedLinkHtml: '<a href="books">knowledge</a>'},
      { href: '{filename}/pages/courses.md', text: 'learned', expectedLinkHtml: '<a href="courses">learned</a>'},
      { href: '{filename}/pages/blog.md', text: 'blog', expectedLinkHtml: '<a href="blog">blog</a>'},
      { href: '{filename}/pages/contact.md', text: 'contact', expectedLinkHtml: '<a href="contact">contact</a>'},
      { href: '/documents/Application_Documents_Lukas_Woodtli.zip', text: 'Application Documents',
        expectedLinkHtml: '<a href="assets/documents/Application_Documents_Lukas_Woodtli.zip">Application Documents</a>'},
      { href: 'courses.html', text: 'courses', expectedLinkHtml: '<a href="courses">courses</a>'},
      { href: 'https://www.linkedin.com/in/lukaswoodtli', text: 'LinkedIn',
        expectedLinkHtml: '<a href="https://www.linkedin.com/in/lukaswoodtli" target="_blank">LinkedIn</a>'},

    ];
    renderLinkTestData.forEach((testCase) => {
      it(`link to : ${testCase.text}`, () => {
        expect(componentProto.renderLink(testCase.href, null, testCase.text))
          .toBe(testCase.expectedLinkHtml);
      });
    });
  });
});
