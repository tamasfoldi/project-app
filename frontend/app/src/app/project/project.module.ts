import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromProject from './project.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProjectEffects } from './project.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromProject.projectsFeatureKey, fromProject.reducer),
    EffectsModule.forFeature([ProjectEffects])
  ]
})
export class ProjectModule { }
