import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Project } from '../../api';
import {
  addProject,
  deleteProject,
  fetchProjects,
  updateProject,
} from '../project/project.actions';
import { selectAllProject } from '../project/project.reducer';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPageComponent implements OnInit {
  projects$ = this.store.select(selectAllProject);

  creatingProject = false;

  newProjectTitle = new FormControl(
    '',
    Validators.compose([Validators.required, Validators.minLength(2)])
  );

  editedProjectTitle!: string;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(fetchProjects());
  }

  createProject(projectTitle: string): void {
    this.store.dispatch(addProject({ project: { title: projectTitle } }));
    this.creatingProject = false;
    this.newProjectTitle.reset();
  }

  deleteProject(projectId: string): void {
    this.store.dispatch(deleteProject({ id: projectId }));
  }

  saveEdit(rawData: Project) {
    this.store.dispatch(
      updateProject({
        project: { title: this.editedProjectTitle, id: rawData.id },
      })
    );
  }
}
