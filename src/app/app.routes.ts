import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CourseListComponent } from './features/courses/course-list/course-list.component';
import { CourseFormComponent } from './features/courses/course-form/course-form.component';
import { CourseDetailComponent } from './features/courses/course-detail/course-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cursos', component: CourseListComponent },
  { path: 'cursos/nuevo', component: CourseFormComponent },
  { path: 'cursos/:id', component: CourseDetailComponent },
  { path: 'cursos/:id/editar', component: CourseFormComponent },
  { path: '**', redirectTo: '' }
];
