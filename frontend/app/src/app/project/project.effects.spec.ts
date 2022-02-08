import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import {
  SpectatorService,
  createServiceFactory,
  SpyObject,
} from '@ngneat/spectator';
import { cold, hot } from 'jasmine-marbles';

import { ProjectEffects } from './project.effects';
import { Project, ProjectService } from '../../api';
import { fetchProjects, fetchProjectsSuccess } from './project.actions';

describe('ProjectEffects', () => {
  let actions$: Observable<any>;
  let effects: ProjectEffects;
  let spectator: SpectatorService<ProjectEffects>;
  let projectService: SpyObject<ProjectService>;

  const createService = createServiceFactory<ProjectEffects>({
    service: ProjectEffects,
    providers: [provideMockActions(() => actions$)],
    mocks: [ProjectService],
  });

  beforeEach(() => {
    spectator = createService();
    effects = spectator.service;
    projectService = spectator.inject(ProjectService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('fetchProjects$', () => {
    it('should return a fetchProjectsSuccess action', () => {
      const projects: Project[] = [
        {
          id: 'project',
          title: 'Test Project',
          published_at: '2021-01-01',
        },
      ];
      const action = fetchProjects();
      const completion = fetchProjectsSuccess({ projects });

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: projects });
      const expected = cold('--b', { b: completion });
      projectService.projectsGet.and.returnValue(response);

      expect(spectator.service.fetchProjects$).toBeObservable(expected);
    });
  });
});
