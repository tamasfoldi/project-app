import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fetchProjects } from '../project/project.actions';
import { selectAllProject } from '../project/project.reducer';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
})
export class ProjectsPageComponent implements OnInit {
  projects$ = this.store.select(selectAllProject);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(fetchProjects());
  }
}
