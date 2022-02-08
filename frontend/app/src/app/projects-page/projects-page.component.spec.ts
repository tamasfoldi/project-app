import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TableModule } from 'primeng/table';
import { Project } from '../../api';
import { fetchProjects } from '../project/project.actions';
import { selectAllProject } from '../project/project.reducer';
import { ProjectsPageComponent } from './projects-page.component';

describe('ProjectsPageComponent', () => {
  let spectator: Spectator<ProjectsPageComponent>;
  const createComponent = createComponentFactory({
    component: ProjectsPageComponent,
    detectChanges: false,
    providers: [
      provideMockStore({
        initialState: {},
        selectors: [{ selector: selectAllProject, value: [] }],
      }),
    ],
    imports: [TableModule],
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
    const projects: Project[] = [
      {
        id: 'id',
        title: 'Test Project',
        published_at: '2022-02-01T12:01:40.195Z',
      },
    ];
    store.overrideSelector(selectAllProject, projects);
    store.refreshState();
    spectator.detectChanges();

    expect(spectator.query('td')).toHaveText('Test Project');
  });
});
