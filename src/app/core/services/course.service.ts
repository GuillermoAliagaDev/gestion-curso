import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { Course } from '../../shared/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';
  private localCourses: Course[] = [
    { id: 1, nombre: 'Introducción a Angular', categoria: 'Programación', docente: 'Ing. López', modalidad: 'virtual', duracionHoras: 40, vacantes: 30, costo: 500, fechaInicio: '2026-05-15', activo: true, descripcion: 'Curso básico de Angular moderno.' },
    { id: 2, nombre: 'TypeScript Avanzado', categoria: 'Programación', docente: 'Ing. Torres', modalidad: 'híbrida', duracionHoras: 35, vacantes: 25, costo: 450, fechaInicio: '2026-06-01', activo: true, descripcion: 'Aprende tipado avanzado con TypeScript.' },
    { id: 3, nombre: 'Diseño UX/UI', categoria: 'Diseño', docente: 'Lic. Méndez', modalidad: 'presencial', duracionHoras: 50, vacantes: 20, costo: 600, fechaInicio: '2026-05-20', activo: false, descripcion: 'Fundamentos de experiencia de usuario.' },
    { id: 4, nombre: 'Python para Data Science', categoria: 'Programación', docente: 'Ing. Vargas', modalidad: 'virtual', duracionHoras: 60, vacantes: 35, costo: 700, fechaInicio: '2026-06-10', activo: true, descripcion: 'Aprende Python aplicado a ciencia de datos.' },
    { id: 5, nombre: 'Marketing Digital', categoria: 'Negocios', docente: 'Mg. Castro', modalidad: 'virtual', duracionHoras: 30, vacantes: 40, costo: 400, fechaInicio: '2026-05-25', activo: true, descripcion: 'Estrategias de marketing en entornos digitales.' },
    { id: 6, nombre: 'Desarrollo de APIs con Node.js', categoria: 'Programación', docente: 'Ing. Ramírez', modalidad: 'híbrida', duracionHoras: 45, vacantes: 28, costo: 550, fechaInicio: '2026-06-15', activo: true, descripcion: 'Crea APIs RESTful con Node.js y Express.' },
    { id: 7, nombre: 'Gestión de Proyectos Ágiles', categoria: 'Negocios', docente: 'Mg. Silva', modalidad: 'presencial', duracionHoras: 25, vacantes: 15, costo: 350, fechaInicio: '2026-05-30', activo: true, descripcion: 'Metodologías ágiles aplicadas a proyectos reales.' },
    { id: 8, nombre: 'Diseño Gráfico con Photoshop', categoria: 'Diseño', docente: 'Lic. Torres', modalidad: 'presencial', duracionHoras: 40, vacantes: 18, costo: 480, fechaInicio: '2026-06-05', activo: false, descripcion: 'Domina las herramientas de Photoshop para diseño.' },
    { id: 9, nombre: 'Bases de Datos SQL', categoria: 'Programación', docente: 'Ing. Herrera', modalidad: 'virtual', duracionHoras: 35, vacantes: 32, costo: 420, fechaInicio: '2026-06-20', activo: true, descripcion: 'Aprende a administrar y consultar bases de datos.' },
    { id: 10, nombre: 'Oratoria y Comunicación', categoria: 'Soft Skills', docente: 'Lic. Mendoza', modalidad: 'presencial', duracionHoras: 20, vacantes: 25, costo: 300, fechaInicio: '2026-05-28', activo: true, descripcion: 'Mejora tus habilidades de comunicación efectiva.' }
  ];

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    console.log('CourseService: getCourses called, returning', this.localCourses.length, 'courses');
    return of(this.localCourses).pipe(delay(300));
  }

  getCourseById(id: number): Observable<Course | undefined> {
    const course = this.localCourses.find(c => c.id === id);
    return of(course).pipe(delay(200));
  }

  addCourse(course: Omit<Course, 'id'>): Observable<Course> {
    const newCourse: Course = { ...course, id: this.localCourses.length + 1 };
    this.localCourses.push(newCourse);
    return of(newCourse).pipe(delay(300));
  }

  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    const index = this.localCourses.findIndex(c => c.id === id);
    if (index !== -1) {
      this.localCourses[index] = { ...this.localCourses[index], ...course };
    }
    return of(this.localCourses[index]).pipe(delay(300));
  }
}
