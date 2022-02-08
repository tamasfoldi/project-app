import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ProjectActions from './project.actions';
import { Project } from '../../api';

export const projectsFeatureKey = 'projects';

export interface ProjectState extends EntityState<Project> {}

export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>();

export const initialState: ProjectState = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,
  on(ProjectActions.addProject, (state, action) =>
    adapter.addOne(action.project, state)
  ),
  on(ProjectActions.upsertProject, (state, action) =>
    adapter.upsertOne(action.project, state)
  ),
  on(ProjectActions.addProjects, (state, action) =>
    adapter.addMany(action.projects, state)
  ),
  on(ProjectActions.upsertProjects, (state, action) =>
    adapter.upsertMany(action.projects, state)
  ),
  on(ProjectActions.updateProject, (state, action) =>
    adapter.updateOne(action.project, state)
  ),
  on(ProjectActions.updateProjects, (state, action) =>
    adapter.updateMany(action.projects, state)
  ),
  on(ProjectActions.deleteProject, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(ProjectActions.deleteProjects, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(ProjectActions.loadProjects, (state, action) =>
    adapter.setAll(action.projects, state)
  ),
  on(ProjectActions.clearProjects, (state) => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
