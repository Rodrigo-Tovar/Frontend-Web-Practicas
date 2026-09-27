import { Module } from '@nestjs/common';
import { MiembrosService } from './miembros.service';
import { MiembrosController } from './miembros.controller';
import { MIEMBRO_REPOSITORY } from './miembros.tokens';
import { MiembroMemoriaRepository } from './infra/miembro-memoria.repository';

@Module({
  providers: [
    MiembrosService,
    { provide: MIEMBRO_REPOSITORY, useClass: MiembroMemoriaRepository },
  ],
  controllers: [MiembrosController],
})
export class MiembrosModule {}
