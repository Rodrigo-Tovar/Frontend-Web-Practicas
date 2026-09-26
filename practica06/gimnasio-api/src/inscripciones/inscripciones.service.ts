import { Inject, Injectable } from '@nestjs/common';
import type { InscripcionRepository } from './dominio/inscripcion.repository';
import { INSCRIPCION_REPOSITORY } from './inscripciones.tokens';
import { Inscripcion } from './dominio/entidades';
import { CrearInscripcionDto } from './dto/crear-inscripcion.dto';
import {
  HorarioNoEncontradoError,
  MiembroNoEncontradoError,
  InscripcionDuplicadaError,
  InscripcionYaCanceladaError,
  CupoLlenoError,
} from './dominio/errores';

@Injectable()
export class InscripcionesService {
  constructor(
    @Inject(INSCRIPCION_REPOSITORY)
    private readonly repo: InscripcionRepository,
  ) {}

  listar(): Promise<Inscripcion[]> {
    return this.repo.listar();
  }

  buscar(id: number): Promise<Inscripcion | null> {
    return this.repo.buscarPorId(id);
  }

  async crear(dto: CrearInscripcionDto): Promise<Inscripcion> {
    const horario = await this.repo.buscarHorario(dto.horarioId);
    if (!horario) {
      throw new HorarioNoEncontradoError(dto.horarioId);
    }

    const miembro = await this.repo.buscarMiembro(dto.miembroId);
    if (!miembro) {
      throw new MiembroNoEncontradoError(dto.miembroId);
    }

    const delHorario = await this.repo.buscarPorHorario(dto.horarioId);
    const previa = delHorario.find((i) => i.miembroId === dto.miembroId);
    if (previa) {
      if (previa.estado === 'cancelada') {
        throw new InscripcionYaCanceladaError(dto.horarioId, dto.miembroId);
      }
      throw new InscripcionDuplicadaError(dto.horarioId, dto.miembroId);
    }

    const confirmadas = delHorario.filter(
      (i) => i.estado === 'confirmada',
    ).length;
    if (confirmadas >= horario.cupoMaximo) {
      throw new CupoLlenoError(dto.horarioId, horario.cupoMaximo);
    }

    return this.repo.guardar({
      horarioId: dto.horarioId,
      miembroId: dto.miembroId,
    });
  }

  cancelar(id: number): Promise<Inscripcion | null> {
    return this.repo.cancelar(id);
  }
}
