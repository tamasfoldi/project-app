import { Project } from '../../api';
import {
  addProject,
  addProjectSuccess,
  deleteProject,
  deleteProjectSuccess,
  fetchProjects,
  fetchProjectsSuccess,
  updateProject,
  updateProjectSuccess,
} from './project.actions';
import {
  reducer,
  initialState,
  ProjectState,
  selectAllProject,
} from './project.reducer';

const project: Project = {
  id: 'id',
  title: 'Test Project',
  published_at: '2021-01-01',
};

describe('Project Reducer', () => {
  describe('fetchProjects action', () => {
    it('should set the fetching flag to true', () => {
      const action = fetchProjects();
      const state: ProjectState = { ...initialState, fetching: false };
      const newState: ProjectState = {
        ...initialState,
        fetching: true,
      };

      const result = reducer(state, action);

      expect(result).toEqual(newState);
    });
  });

  describe('fetchProjectsSuccess action', () => {
    it('should set the fetching flag to false', () => {
      const action = fetchProjectsSuccess({ projects: [project] });
      const state: ProjectState = { ...initialState, fetching: true };
      const newState: ProjectState = {
        ...initialState,
        fetching: false,
        entities: {
          [project.id]: project,
        },
        ids: [project.id],
      };

      const result = reducer(state, action);

      expect(result).toEqual(newState);
    });

    it('should set the projects', () => {
      const action = fetchProjectsSuccess({ projects: [project] });
      const newState: ProjectState = {
        ...initialState,
        entities: {
          [project.id]: project,
        },
        ids: [project.id],
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(newState);
    });
  });

  describe('addProject action', () => {
    it('should set the creating flag to true', () => {
      const action = addProject({ project });
      const state: ProjectState = { ...initialState, creating: false };
      const newState: ProjectState = {
        ...initialState,
        creating: true,
      };

      const result = reducer(state, action);

      expect(result).toEqual(newState);
    });
  });

  describe('addProjectSuccess action', () => {
    it('should set the adding flag to false', () => {
      const action = addProjectSuccess({ project });
      const state: ProjectState = { ...initialState, creating: true };
      const newState: ProjectState = {
        ...initialState,
        creating: false,
        entities: {
          [project.id]: project,
        },
        ids: [project.id],
      };

      const result = reducer(state, action);

      expect(result).toEqual(newState);
    });

    it('should add the new project', () => {
      const action = addProjectSuccess({ project });
      const newState: ProjectState = {
        ...initialState,
        entities: {
          [project.id]: project,
        },
        ids: [project.id],
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(newState);
    });
  });

  describe('updateProject action', () => {
    it('should set the updating flag to true', () => {
      const action = updateProject({
        project,
      });
      const state: ProjectState = { ...initialState, updating: false };
      const newState: ProjectState = {
        ...initialState,
        updating: true,
      };

      const result = reducer(state, action);

      expect(result).toEqual(newState);
    });
  });

  describe('updateProjectSuccess action', () => {
    it('should set the adding flag to false', () => {
      const action = updateProjectSuccess({
        project: { id: project.id, changes: { title: project.title } },
      });
      const state: ProjectState = {
        ...initialState,
        entities: {
          [project.id]: project,
        },
        ids: [project.id],
        updating: true,
      };
      const newState: ProjectState = {
        ...initialState,
        updating: false,
        entities: {
          [project.id]: project,
        },
        ids: [project.id],
      };

      const result = reducer(state, action);

      expect(result).toEqual(newState);
    });

    it('should update the project', () => {
      const action = updateProjectSuccess({
        project: {
          id: project.id,
          changes: { title: project.title + 'change' },
        },
      });
      const state: ProjectState = {
        ...initialState,
        entities: {
          [project.id]: project,
        },
        ids: [project.id],
      };
      const newState: ProjectState = {
        ...initialState,
        entities: {
          [project.id]: { ...project, title: project.title + 'change' },
        },
        ids: [project.id],
      };

      const result = reducer(state, action);

      expect(result).toEqual(newState);
    });
  });

  describe('deleteProject action', () => {
    it('should set the deleting flag to true', () => {
      const action = deleteProject({ id: project.id });
      const state: ProjectState = { ...initialState, deleting: false };
      const newState: ProjectState = {
        ...initialState,
        deleting: true,
      };

      const result = reducer(state, action);

      expect(result).toEqual(newState);
    });
  });

  describe('deleteProjectSuccess action', () => {
    it('should set the deleting flag to false', () => {
      const action = deleteProjectSuccess({ id: project.id });
      const state: ProjectState = {
        ...initialState,
        deleting: true,
      };
      const newState: ProjectState = {
        ...initialState,
        deleting: false,
      };

      const result = reducer(state, action);

      expect(result).toEqual(newState);
    });

    it('should delete the project', () => {
      const action = deleteProjectSuccess({ id: project.id });
      const state: ProjectState = {
        ...initialState,
        entities: {
          [project.id]: project,
        },
        ids: [project.id],
      };
      const newState: ProjectState = {
        ...initialState,
      };

      const result = reducer(state, action);

      expect(result).toEqual(newState);
    });
  });

  describe('selectAllProject', () => {
    it('should return projects from the state', () => {
      const project: Project = {
        id: 'id',
        title: 'Test Project',
        published_at: '2021-01-01',
      };
      const state: ProjectState = {
        ...initialState,
        entities: {
          [project.id]: project,
        },
        ids: [project.id],
      };

      expect(selectAllProject.projector(state)).toEqual([project]);
    });
  });
});
