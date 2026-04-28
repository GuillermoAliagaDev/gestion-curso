export interface Course {
  id: number;
  nombre: string;
  categoria: string;
  docente: string;
  modalidad: 'presencial' | 'virtual' | 'híbrida';
  duracionHoras: number;
  vacantes: number;
  costo: number;
  fechaInicio: string;
  activo: boolean;
  descripcion: string;
}
