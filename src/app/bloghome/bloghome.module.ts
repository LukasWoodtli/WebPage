import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BloghomeComponent } from './bloghome.component';


const routes: Routes = [
  { path: '', component: BloghomeComponent }
];

@NgModule({
  declarations: [
    BloghomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BloghomeModule { }
