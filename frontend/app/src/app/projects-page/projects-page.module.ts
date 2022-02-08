import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsPageRoutingModule } from './projects-page-routing.module';
import { ProjectsPageComponent } from './projects-page.component';
import { ProjectModule } from '../project/project.module';

@NgModule({
  declarations: [ProjectsPageComponent],
  imports: [CommonModule, ProjectModule, ProjectsPageRoutingModule],
})
export class ProjectsPageModule {}
