import { Module } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { InscripcionesController } from './inscripciones.controller';
import { INSCRIPCION_REPOSITORY } from './inscripciones.tokens';
import { InscripcionMemoriaRepository } from './infra/inscripcion-memoria.repository';

@Module({
  providers: [
    InscripcionesService,
    { provide: INSCRIPCION_REPOSITORY, useClass: InscripcionMemoriaRepository },
  ],
  controllers: [InscripcionesController],
})
export class InscripcionesModule {}
