import { Project } from '../../api';
import { loadProjects } from './project.actions';
import { reducer, initialState, ProjectState } from './project.reducer';

describe('Project Reducer', () => {
  describe('load projects action', () => {
    it('should set the projects', () => {
      const project: Project = {
        id: 'id',
        title: 'Test Project',
        published_at: '2021-01-01',
      };
      const action = loadProjects({ projects: [project] });
      const newState: ProjectState = {
        entities: {
          [project.id]: project,
        },
        ids: [project.id],
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(newState);
    });
  });
});
