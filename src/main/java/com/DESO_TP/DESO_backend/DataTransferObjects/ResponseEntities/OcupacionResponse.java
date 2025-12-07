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
import com.DESO_TP.EntidadesDominio.IDs.HuespedId;
import com.DESO_TP.EntidadesDominio.Ocupacion;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OcupacionResponse {

    private Long idOcupacion;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private LocalTime horaSalida;
    private EstadoOcupacion estado;

    // Relación con habitación
    private Integer numeroHabitacion;

    // IDs de facturas
    private List<Long> idsFactura;

    // IDs de servicios
    private List<Long> idsServicios;

    // IDs de huespedes
    private List<HuespedId> idsHuespedes;
    
    private List<HuespedResponse> huespedes;
    
    public static OcupacionResponse toResponse(Ocupacion ocupacion) {
        OcupacionResponse response = new OcupacionResponse();
        response.setIdOcupacion(ocupacion.getIdOcupacion());
        response.setFechaInicio(ocupacion.getFechaInicio());
        response.setFechaFin(ocupacion.getFechaFin());
        response.setHoraSalida(ocupacion.getHoraSalida()); 
        response.setEstado(ocupacion.getEstado());

        if(ocupacion.getHabitacion() != null)
            response.setNumeroHabitacion(ocupacion.getHabitacion().getNumeroHabitacion());

        response.setIdsFactura(
            ocupacion.getFactura() != null ?
            ocupacion.getFactura().stream().map(f -> f.getNumeroFactura()).toList() :
            List.of()
        );

        response.setIdsHuespedes(
            ocupacion.getHuespedes() != null ?
            ocupacion.getHuespedes()
                .stream()
                .map(h -> new HuespedId(h.getTipoDocumento(), h.getNumeroDocumento()))
                .toList()
            :
            List.of()
        );

        return response;
    }
}
