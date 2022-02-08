import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ProjectActions from './project.actions';
import { Project } from '../../api';

export const projectsFeatureKey = 'projects';

export interface ProjectState extends EntityState<Project> {
  fetching: boolean;
  deleting: boolean;
  creating: boolean;
  updating: boolean;
}

export const projectState =
  createFeatureSelector<ProjectState>(projectsFeatureKey);

export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>();

export const initialState: ProjectState = adapter.getInitialState({
  fetching: false,
  deleting: false,
  creating: false,
  updating: false,
});

export const reducer = createReducer(
  initialState,
  on(ProjectActions.addProject, (state, action) => ({
    ...state,
    creating: true,
  })),
  on(ProjectActions.addProjectSuccess, (state, action) => ({
    ...adapter.addOne(action.project, state),
    creating: false,
  })),
  on(ProjectActions.updateProject, (state, action) => ({
    ...state,
    updating: true,
  })),
  on(ProjectActions.updateProjectSuccess, (state, action) => ({
    ...adapter.updateOne(action.project, state),
    updating: false,
  })),
  on(ProjectActions.deleteProject, (state, action) => ({
    ...state,
    deleting: true,
  })),
  on(ProjectActions.deleteProjectSuccess, (state, action) => ({
    ...adapter.removeOne(action.id, state),
    deleting: false,
  })),
  on(ProjectActions.fetchProjects, (state, action) => ({
    ...state,
    fetching: true,
  })),
  on(ProjectActions.fetchProjectsSuccess, (state, action) => ({
    ...adapter.setAll(action.projects, state),
    fetching: false,
  }))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();

export const selectAllProject = createSelector(projectState, selectAll);
