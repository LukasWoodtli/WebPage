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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
