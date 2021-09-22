import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ScullyLibModule} from '@scullyio/ng-lib';
import {BlogpostsRoutingModule} from './blogposts-routing.module';
import {BlogpostsComponent} from './blogposts.component';

@NgModule({
  declarations: [BlogpostsComponent],
  imports: [CommonModule, BlogpostsRoutingModule, ScullyLibModule],
})
export class BlogpostsModule {}
