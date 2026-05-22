import { Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LectureViewComponent } from './lecture-view/lecture-view.component';
import { CreateLectureComponent } from './create-lecture/create-lecture.component';

export const routes: Routes = [
        {path: "",component: HomeComponentComponent, },
        {path: "home",component: HomeComponentComponent},
        {path: "lecture/:id",component: LectureViewComponent},
        {path: "new-lecture",component:CreateLectureComponent}
];
