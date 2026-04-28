import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../core/services/course.service';
import { Course } from '../../shared/models/course.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <div class="container mx-auto px-4 py-12">
        <div class="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 class="text-4xl font-bold text-blue-800 mb-4">Bienvenido al Módulo de Gestión de Cursos</h2>
          <p class="text-gray-600 text-lg mb-6">Administra el catálogo académico de cursos de extensión de manera eficiente.</p>
          <div class="flex gap-4">
            <a routerLink="/cursos" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">Ver Cursos</a>
            <a routerLink="/cursos/nuevo" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">Nuevo Curso</a>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-blue-800 mb-2">Total Cursos</h3>
            <p class="text-4xl font-bold text-gray-700">{{ totalCourses }}</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-green-600 mb-2">Cursos Activos</h3>
            <p class="text-4xl font-bold text-gray-700">{{ activeCourses }}</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-purple-600 mb-2">Categorías</h3>
            <p class="text-4xl font-bold text-gray-700">{{ categories }}</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  totalCourses = 0;
  activeCourses = 0;
  categories = 0;

  constructor(private courseService: CourseService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    console.log('HomeComponent: ngOnInit called');
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        console.log('HomeComponent: received', courses.length, 'courses');
        this.totalCourses = courses.length;
        this.activeCourses = courses.filter(c => c.activo).length;
        this.categories = new Set(courses.map(c => c.categoria)).size;
        console.log('HomeComponent: updated values', this.totalCourses, this.activeCourses, this.categories);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('HomeComponent: error', err)
    });
  }
}
