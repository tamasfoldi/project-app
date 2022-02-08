import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Project, ProjectService } from '../../api';
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

  addProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProject),
      mergeMap(({ project }) =>
        this.projectService
          .projectsPost(project)
          .pipe(map((project: Project) => addProjectSuccess({ project })))
      )
    )
  );

  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProject),
      mergeMap(({ project }) =>
        this.projectService
          .projectsIdPut(project.id, { title: project.title })
          .pipe(
            map((project: Project) =>
              updateProjectSuccess({
                project: { id: project.id, changes: project },
              })
            )
          )
      )
    )
  );

  deleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProject),
      mergeMap(({ id }) =>
        this._delete(id).pipe(
          map((project: Project) => deleteProjectSuccess({ id: project.id }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private projectService: ProjectService,
    private httpClient: HttpClient
  ) {}

  private _delete(id: string): Observable<Project> {
    return this.httpClient.delete<Project>(
      `http://localhost:1337/projects/${id}`
    );
  }
}
