import { Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LectureViewComponent } from './lecture-view/lecture-view.component';

export const routes: Routes = [
        {path: "",component: HomeComponentComponent, },
        {path: "home",component: HomeComponentComponent},
        {path: "lecture",component: LectureViewComponent},
];
