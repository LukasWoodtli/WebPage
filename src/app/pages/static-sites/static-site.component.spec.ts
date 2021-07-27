import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticSiteComponent } from './static-site.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MarkdownService} from 'ngx-markdown';
import {NO_ERRORS_SCHEMA} from '@angular/core';


class MockRenderer {}

class MarkdownServiceMock {
  renderer: MockRenderer = new MockRenderer();
}

describe('StaticSiteComponent', () => {
  let component: StaticSiteComponent;
  let componentProto: any;
  let fixture: ComponentFixture<StaticSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [ StaticSiteComponent ],
      providers: [{provide: MarkdownService, useClass: MarkdownServiceMock}],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticSiteComponent);
    component = fixture.componentInstance;
    // Inspired by https://stackoverflow.com/a/61658365
    componentProto = Object.getPrototypeOf(component);
    fixture.detectChanges();
  });

  it('metadata tag: Title', () => {
    expect(componentProto.isMetadataTag("Title:")).toBeTruthy();
  });

  it('metadata tag: slug', () => {
    expect(componentProto.isMetadataTag("slug:")).toBeTruthy();
  });

  it('not metadata tag: abc', () => {
    expect(componentProto.isMetadataTag("abc:")).toBeFalsy();
  });
});
