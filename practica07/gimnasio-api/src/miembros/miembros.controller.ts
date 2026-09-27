import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MiembrosService } from './miembros.service';
import type { CrearMiembroDto } from './dto/crear-miembro.dto';
import type { ActualizarMiembroDto } from './dto/actualizar-miembro.dto';

@Controller('miembros')
export class MiembrosController {
  constructor(private readonly servicio: MiembrosService) {}

  @Get()
  listar() {
    return this.servicio.listar();
  }

  @Get(':id')
  async buscar(@Param('id') id: string) {
    const miembro = await this.servicio.buscar(Number(id));
    if (!miembro) {
      throw new NotFoundException(`No se encontró el miembro con id ${id}`);
    }
    return miembro;
  }

  @Post()
  @HttpCode(201)
  crear(@Body() dto: CrearMiembroDto) {
    return this.servicio.crear(dto);
  }

  @Put(':id')
  async actualizar(@Param('id') id: string, @Body() dto: ActualizarMiembroDto) {
    const miembro = await this.servicio.actualizar(Number(id), dto);
    if (!miembro) {
      throw new NotFoundException(`No se encontró el miembro con id ${id}`);
    }
    return miembro;
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    const miembro = await this.servicio.eliminar(Number(id));
    if (!miembro) {
      throw new NotFoundException(`No se encontró el miembro con id ${id}`);
    }
    return miembro;
  }
}
