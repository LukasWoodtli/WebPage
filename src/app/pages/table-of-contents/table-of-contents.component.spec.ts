import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOfContentsComponent } from './table-of-contents.component';
import {TableOfContent, TableOfContentEntry} from './table-of-content';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

describe('TableOfContentsComponent', () => {
  let component: TableOfContentsComponent;
  let fixture: ComponentFixture<TableOfContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableOfContentsComponent ],
      imports: [RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOfContentsComponent);
    component = fixture.componentInstance;
  });

  it('check TOC', () => {
    const toc: TableOfContent = [];
    const tocEntry = new TableOfContentEntry(1, 'Hello', 'hello-anchor');
    toc.push(tocEntry);
    component.tableOfContent = toc;

    fixture.detectChanges();

    const rootElement = fixture.debugElement;
    const aElement = rootElement.query(By.css('a'));
    expect(aElement.properties.href).toBe('/#hello-anchor');
    const aElementText = aElement.nativeElement.innerHTML.trim();
    expect(aElementText).toBe('Hello');
  });
});
