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
  let buttonsTexts: string[];

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

    const buttons: DebugElement[] = htmlElement.queryAll(By.css('button'));
    buttonsTexts = buttons.map((item) => item.nativeElement.textContent.trim());

  });

  it('should have the toolbar button names', () => {
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
});
