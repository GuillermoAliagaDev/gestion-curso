import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../shared/models/course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="min-h-screen bg-gray-100 py-8">
      <div class="container mx-auto px-4 max-w-3xl" *ngIf="course; else noCourse">
        <div class="bg-white rounded-lg shadow-md p-8">
          <div class="flex justify-between items-start mb-6">
            <h2 class="text-3xl font-bold text-blue-800">{{ course.nombre }}</h2>
            <span [class]="course.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" class="px-3 py-1 rounded-full text-sm font-semibold">
              {{ course.activo ? 'Activo' : 'Inactivo' }}
            </span>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p class="text-gray-600"><strong>Categoría:</strong> {{ course.categoria }}</p>
              <p class="text-gray-600"><strong>Docente:</strong> {{ course.docente }}</p>
              <p class="text-gray-600"><strong>Modalidad:</strong> {{ course.modalidad | titlecase }}</p>
            </div>
            <div>
              <p class="text-gray-600"><strong>Duración:</strong> {{ course.duracionHoras }} horas</p>
              <p class="text-gray-600"><strong>Vacantes:</strong> {{ course.vacantes }}</p>
              <p class="text-gray-600"><strong>Fecha Inicio:</strong> {{ course.fechaInicio }}</p>
            </div>
          </div>
          <p class="text-blue-600 font-bold text-2xl mb-4">S/ {{ course.costo }}</p>
          <p class="text-gray-700 mb-6">{{ course.descripcion }}</p>
          <div class="flex gap-4">
            <a [routerLink]="['/cursos', course.id, 'editar']" class="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">Editar</a>
            <a routerLink="/cursos" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">Volver al Listado</a>
          </div>
        </div>
      </div>
      <ng-template #noCourse>
        <p class="text-gray-500 text-center py-8">Curso no encontrado.</p>
      </ng-template>
    </div>
  `
})
export class CourseDetailComponent implements OnInit {
  course?: Course;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('CourseDetailComponent: id from route:', idParam);
    const id = +idParam!;
    console.log('CourseDetailComponent: parsed id:', id);
    this.courseService.getCourseById(id).subscribe({
      next: (course) => {
        console.log('CourseDetailComponent: received course:', course);
        this.course = course;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('CourseDetailComponent: error', err)
    });
  }
}
