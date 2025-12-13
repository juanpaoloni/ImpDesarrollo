/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities;

/**
 *
 * @author jauni
 */
import com.DESO_TP.Enumerados.EstadoOcupacion;
import com.DESO_TP.EntidadesDominio.Ocupacion;
import java.time.LocalDate;
import java.util.List;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OcupacionResponse {

    private Long idOcupacion;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private EstadoOcupacion estado;

    private HabitacionResponse habitacion;
    private List<ServicioResponse> servicios;
    private List<HuespedResponse> huespedes;

    public static OcupacionResponse toResponse(Ocupacion ocupacion) {
        return OcupacionResponse.builder()
            .idOcupacion(ocupacion.getIdOcupacion())
            .fechaInicio(ocupacion.getFechaInicio())
            .fechaFin(ocupacion.getFechaFin())
            .estado(ocupacion.getEstado())
            .habitacion(
                ocupacion.getHabitacion() != null
                    ? HabitacionResponse.toResponse(ocupacion.getHabitacion())
                    : null
            )
            .servicios(
                ocupacion.getServicios() != null
                    ? ocupacion.getServicios()
                        .stream()
                        .map(ServicioResponse::toResponse)
                        .toList()
                    : List.of()
            )
            .huespedes(
                ocupacion.getHuespedes() != null
                    ? ocupacion.getHuespedes()
                        .stream()
                        .map(HuespedResponse::toResponse)
                        .toList()
                    : List.of()
            )
            .build();
    }
}