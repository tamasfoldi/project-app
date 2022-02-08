import { Spectator, createComponentFactory, byText } from '@ngneat/spectator';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

import { Project } from '../../api';
import {
  addProject,
  deleteProject,
  fetchProjects,
  updateProject,
} from '../project/project.actions';
import { selectAllProject } from '../project/project.reducer';
import { ProjectsPageComponent } from './projects-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ProjectsPageComponent', () => {
  let spectator: Spectator<ProjectsPageComponent>;
  const createComponent = createComponentFactory({
    component: ProjectsPageComponent,
    detectChanges: false,
    providers: [
      provideMockStore({
        initialState: {},
        selectors: [
          {
            selector: selectAllProject,
            value: [
              {
                id: 'id',
                title: 'Test Project',
                published_at: '2022-02-01T12:01:40.195Z',
              },
            ],
          },
        ],
      }),
    ],
    imports: [
      TableModule,
      ButtonModule,
      InputTextModule,
      DialogModule,
      ReactiveFormsModule,
      FormsModule,
    ],
  });

  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  beforeEach(() => {
    spectator = createComponent();
    store = spectator.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch').and.callThrough();
    spectator.detectChanges();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should fetch the projects', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(fetchProjects());
  });

  it('should have a title', () => {
    expect(spectator.query('h1')).toHaveExactText('Projects');
  });

  it('should list projects', () => {
    expect(spectator.query('td')).toHaveText('Test Project');
  });

  it('should add new project', () => {
    spectator.click(byText('Add new'));
    spectator.typeInElement('test project', 'input');
    spectator.click('p-button');

    expect(dispatchSpy).toHaveBeenCalledWith(
      addProject({ project: { title: 'test project' } })
    );
    expect(spectator.component.creatingProject).toEqual(false);
    expect(spectator.component.newProjectTitle.value).toBeNull();
  });

  it('should remove project', () => {
    spectator.click('.pi-trash');

    expect(dispatchSpy).toHaveBeenCalledWith(deleteProject({ id: 'id' }));
  });

  it('should edit a title', () => {
    spectator.click(byText('Test Project'));
    spectator.typeInElement('Modified', 'input');
    spectator.dispatchKeyboardEvent('input', 'keydown', 'Enter');

    expect(dispatchSpy).toHaveBeenCalledWith(
      updateProject({ project: { id: 'id', title: 'Modified' } })
    );
  });
});
