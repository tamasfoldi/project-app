import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Project } from '../../api';

export const loadProjects = createAction(
  '[Project/API] Load Projects',
  props<{ projects: Project[] }>()
);

export const addProject = createAction(
  '[Project/API] Add Project',
  props<{ project: Project }>()
);

export const upsertProject = createAction(
  '[Project/API] Upsert Project',
  props<{ project: Project }>()
);

export const addProjects = createAction(
  '[Project/API] Add Projects',
  props<{ projects: Project[] }>()
);

export const upsertProjects = createAction(
  '[Project/API] Upsert Projects',
  props<{ projects: Project[] }>()
);

export const updateProject = createAction(
  '[Project/API] Update Project',
  props<{ project: Update<Project> }>()
);

export const updateProjects = createAction(
  '[Project/API] Update Projects',
  props<{ projects: Update<Project>[] }>()
);

export const deleteProject = createAction(
  '[Project/API] Delete Project',
  props<{ id: string }>()
);

export const deleteProjects = createAction(
  '[Project/API] Delete Projects',
  props<{ ids: string[] }>()
);

export const clearProjects = createAction('[Project/API] Clear Projects');
