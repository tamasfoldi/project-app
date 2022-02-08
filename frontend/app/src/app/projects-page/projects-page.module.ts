import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { ProjectsPageRoutingModule } from './projects-page-routing.module';
import { ProjectsPageComponent } from './projects-page.component';
import { ProjectModule } from '../project/project.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProjectsPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProjectModule,
    ProjectsPageRoutingModule,
    TableModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
  ],
})
export class ProjectsPageModule {}
