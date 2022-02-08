import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { NewProject, Project } from '../../api';

export const fetchProjects = createAction('[Project/API] Fetch Projects');

export const fetchProjectsSuccess = createAction(
  '[Project/API] Fetch Projects Success',
  props<{ projects: Project[] }>()
);

export const addProject = createAction(
  '[Project/API] Add Project',
  props<{ project: NewProject }>()
);

export const addProjectSuccess = createAction(
  '[Project/API] Add Project Success',
  props<{ project: Project }>()
);

export const updateProject = createAction(
  '[Project/API] Update Project',
  props<{ project: Project }>()
);

export const updateProjectSuccess = createAction(
  '[Project/API] Update Project Success',
  props<{ project: Update<Project> }>()
);

export const deleteProject = createAction(
  '[Project/API] Delete Project',
  props<{ id: string }>()
);

export const deleteProjectSuccess = createAction(
  '[Project/API] Delete Project Success',
  props<{ id: string }>()
);
