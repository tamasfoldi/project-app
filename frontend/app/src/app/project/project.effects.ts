import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { Project, ProjectService } from '../../api';
import { fetchProjects, fetchProjectsSuccess } from './project.actions';

@Injectable()
export class ProjectEffects {
  fetchProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchProjects),
      mergeMap(() =>
        this.projectService
          .projectsGet()
          .pipe(
            map((projects: Project[]) => fetchProjectsSuccess({ projects }))
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private projectService: ProjectService
  ) {}
}
