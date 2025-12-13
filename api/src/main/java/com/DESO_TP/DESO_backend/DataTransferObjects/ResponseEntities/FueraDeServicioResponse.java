/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities;

import com.DESO_TP.EntidadesDominio.FueraDeServicio;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author jauni
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FueraDeServicioResponse {
    private int numeroHabitacion;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private String descripcion;
    
    public static FueraDeServicioResponse toResponse(FueraDeServicio fds) {
        if (fds == null) return null;

        return FueraDeServicioResponse.builder()
            .numeroHabitacion(fds.getId().getNumeroHabitacion())
            .fechaInicio(fds.getId().getFechaInicio())
            .fechaFin(fds.getFechaFin())
            .descripcion(fds.getDescripcion())
            .build();
    }
}