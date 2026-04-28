import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../shared/models/course.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="min-h-screen bg-gray-100 py-8">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-3xl font-bold text-blue-800">Catálogo de Cursos</h2>
          <a routerLink="/cursos/nuevo" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">Nuevo Curso</a>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (course of courses; track course.id) {
            <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div class="flex justify-between items-start mb-3">
                <h3 class="text-xl font-bold text-gray-800">{{ course.nombre }}</h3>
                <span [class]="course.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" class="px-2 py-1 rounded-full text-xs font-semibold">
                  {{ course.activo ? 'Activo' : 'Inactivo' }}
                </span>
              </div>
              <p class="text-gray-600 mb-2"><strong>Categoría:</strong> {{ course.categoria }}</p>
              <p class="text-gray-600 mb-2"><strong>Docente:</strong> {{ course.docente }}</p>
              <p class="text-gray-600 mb-2"><strong>Modalidad:</strong> {{ course.modalidad | titlecase }}</p>
              <p class="text-gray-600 mb-2"><strong>Vacantes:</strong> {{ course.vacantes }}</p>
              <p class="text-blue-600 font-bold text-lg mb-4">S/ {{ course.costo }}</p>
              <a [routerLink]="['/cursos', course.id]" class="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">Ver Detalle</a>
            </div>
          } @empty {
            <p class="text-gray-500 text-center col-span-full">No hay cursos registrados.</p>
          }
        </div>
      </div>
    </div>
  `
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    console.log('CourseListComponent: ngOnInit called');
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        console.log('CourseListComponent: received', courses.length, 'courses');
        this.courses = courses;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('CourseListComponent: error loading courses', err)
    });
  }
}
