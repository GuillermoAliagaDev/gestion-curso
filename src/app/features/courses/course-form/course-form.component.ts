import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../../core/services/course.service';
import { Course } from '../../../shared/models/course.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-gray-100 py-8">
      <div class="container mx-auto px-4 max-w-2xl">
        <h2 class="text-3xl font-bold text-blue-800 mb-6">{{ isEdit ? 'Editar' : 'Nuevo' }} Curso</h2>
        <form [formGroup]="courseForm" (ngSubmit)="onSubmit()" class="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div>
            <label class="block text-sm font-semibold mb-1">Nombre *</label>
            <input formControlName="nombre" type="text" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="courseForm.get('nombre')?.invalid && courseForm.get('nombre')?.touched">
            @if (courseForm.get('nombre')?.invalid && courseForm.get('nombre')?.touched) {
              <p class="text-red-500 text-xs mt-1">El nombre es obligatorio (mín. 3 caracteres)</p>
            }
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Categoría *</label>
            <input formControlName="categoria" type="text" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="courseForm.get('categoria')?.invalid && courseForm.get('categoria')?.touched">
            @if (courseForm.get('categoria')?.invalid && courseForm.get('categoria')?.touched) {
              <p class="text-red-500 text-xs mt-1">La categoría es obligatoria</p>
            }
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Docente *</label>
            <input formControlName="docente" type="text" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="courseForm.get('docente')?.invalid && courseForm.get('docente')?.touched">
            @if (courseForm.get('docente')?.invalid && courseForm.get('docente')?.touched) {
              <p class="text-red-500 text-xs mt-1">El docente es obligatorio</p>
            }
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold mb-1">Modalidad *</label>
              <select formControlName="modalidad" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                [class.border-red-500]="courseForm.get('modalidad')?.invalid && courseForm.get('modalidad')?.touched">
                <option value="">Seleccione...</option>
                <option value="presencial">Presencial</option>
                <option value="virtual">Virtual</option>
                <option value="híbrida">Híbrida</option>
              </select>
              @if (courseForm.get('modalidad')?.invalid && courseForm.get('modalidad')?.touched) {
                <p class="text-red-500 text-xs mt-1">Seleccione una modalidad</p>
              }
            </div>
            <div>
              <label class="block text-sm font-semibold mb-1">Fecha Inicio *</label>
              <input formControlName="fechaInicio" type="date" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                [class.border-red-500]="courseForm.get('fechaInicio')?.invalid && courseForm.get('fechaInicio')?.touched">
              @if (courseForm.get('fechaInicio')?.invalid && courseForm.get('fechaInicio')?.touched) {
                <p class="text-red-500 text-xs mt-1">La fecha es obligatoria</p>
              }
            </div>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-semibold mb-1">Horas *</label>
              <input formControlName="duracionHoras" type="number" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                [class.border-red-500]="courseForm.get('duracionHoras')?.invalid && courseForm.get('duracionHoras')?.touched">
              @if (courseForm.get('duracionHoras')?.invalid && courseForm.get('duracionHoras')?.touched) {
                <p class="text-red-500 text-xs mt-1">Mín. 1 hora</p>
              }
            </div>
            <div>
              <label class="block text-sm font-semibold mb-1">Vacantes *</label>
              <input formControlName="vacantes" type="number" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                [class.border-red-500]="courseForm.get('vacantes')?.invalid && courseForm.get('vacantes')?.touched">
              @if (courseForm.get('vacantes')?.invalid && courseForm.get('vacantes')?.touched) {
                <p class="text-red-500 text-xs mt-1">Mín. 1 vacante</p>
              }
            </div>
            <div>
              <label class="block text-sm font-semibold mb-1">Costo *</label>
              <input formControlName="costo" type="number" step="0.01" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                [class.border-red-500]="courseForm.get('costo')?.invalid && courseForm.get('costo')?.touched">
              @if (courseForm.get('costo')?.invalid && courseForm.get('costo')?.touched) {
                <p class="text-red-500 text-xs mt-1">Mín. S/ 0</p>
              }
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Descripción *</label>
            <textarea formControlName="descripcion" rows="3" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="courseForm.get('descripcion')?.invalid && courseForm.get('descripcion')?.touched"></textarea>
            @if (courseForm.get('descripcion')?.invalid && courseForm.get('descripcion')?.touched) {
              <p class="text-red-500 text-xs mt-1">La descripción es obligatoria (mín. 10 caracteres)</p>
            }
          </div>
          <div class="flex items-center gap-2">
            <input formControlName="activo" type="checkbox" class="w-4 h-4 text-blue-600 rounded">
            <label class="text-sm font-semibold">Curso Activo</label>
          </div>
          <div class="flex gap-4 mt-6">
            <button type="submit" [disabled]="courseForm.invalid" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400">
              {{ isEdit ? 'Actualizar' : 'Registrar' }}
            </button>
            <button type="button" (click)="goBack()" class="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class CourseFormComponent implements OnInit {
  courseForm: FormGroup;
  isEdit = false;
  courseId?: number;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courseForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      categoria: ['', Validators.required],
      docente: ['', Validators.required],
      modalidad: ['', Validators.required],
      duracionHoras: [0, [Validators.required, Validators.min(1)]],
      vacantes: [0, [Validators.required, Validators.min(1)]],
      costo: [0, [Validators.required, Validators.min(0)]],
      fechaInicio: ['', Validators.required],
      activo: [true],
      descripcion: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.courseId = +id;
      this.courseService.getCourseById(this.courseId).subscribe(course => {
        if (course) this.courseForm.patchValue(course);
      });
    }
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const courseData = this.courseForm.getRawValue();
      let operation: Observable<Course>;
      if (this.isEdit && this.courseId) {
        operation = this.courseService.updateCourse(this.courseId, courseData);
      } else {
        operation = this.courseService.addCourse(courseData);
      }
      operation.subscribe(() => this.router.navigate(['/cursos']));
    } else {
      this.courseForm.markAllAsTouched();
    }
  }

  goBack() {
    this.router.navigate(['/cursos']);
  }
}
