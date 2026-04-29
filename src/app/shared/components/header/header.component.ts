import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="bg-blue-800 text-white shadow-lg">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold">OfCourses</h1>
          <nav class="flex gap-6">
            <a routerLink="/" routerLinkActive="text-yellow-300" [routerLinkActiveOptions]="{exact: true}" class="hover:text-yellow-300 transition-colors">Inicio</a>
            <a routerLink="/cursos" routerLinkActive="text-yellow-300" class="hover:text-yellow-300 transition-colors">Cursos</a>
            <a routerLink="/cursos/nuevo" routerLinkActive="text-yellow-300" class="hover:text-yellow-300 transition-colors">Nuevo Curso</a>
          </nav>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent { }
