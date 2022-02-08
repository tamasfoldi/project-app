import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
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
});
