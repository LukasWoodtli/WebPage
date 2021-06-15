import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarMenuComponent } from './toolbar-menu.component';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterTestingModule} from '@angular/router/testing';

describe('ToolbarMenuComponent', () => {
  let component: ToolbarMenuComponent;
  let fixture: ComponentFixture<ToolbarMenuComponent>;
  let htmlElement: DebugElement;
  let buttons: DebugElement[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatToolbarModule, RouterTestingModule.withRoutes([])],
      declarations: [ ToolbarMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    htmlElement = fixture.debugElement;
  });

  beforeEach(() => {
    buttons = htmlElement.queryAll(By.css('button'));
  });

  it('should have the toolbar button names', () => {

    const buttonsTexts: string[] = buttons.map((item) => item.nativeElement.textContent.trim());

    expect(buttonsTexts)
      .toEqual([
        'Lukas Woodtli',
        'Home',
        'Resume',
        'Skills',
        'Books',
        'Courses',
        'Projects',
        'Blog',
        'Contact']);
  });

  it('should have a unique id for each button', () =>
  {
    const buttonIds: string[] = buttons.map((item) => item.nativeElement.id);

    expect(buttonIds).toEqual([
      'page-title-button-id',
      'index-button-id',
      'resume-button-id',
      'skills-button-id',
      'books-button-id',
      'courses-button-id',
      'projects-button-id',
      'blog-button-id',
      'contact-button-id'
    ]);
  });
});
