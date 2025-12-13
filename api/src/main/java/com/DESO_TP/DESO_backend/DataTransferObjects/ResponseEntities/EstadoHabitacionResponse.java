/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities;

import java.util.Map;
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
public class EstadoHabitacionResponse {
    private Integer numeroHabitacion;
    private Map<String, String> estadoPorFecha;
    
    public static EstadoHabitacionResponse toResponse(Integer num, Map<String, String> estadoPorFecha){
        return EstadoHabitacionResponse.builder()
            .numeroHabitacion(num)
            .estadoPorFecha(estadoPorFecha)
            .build();
    }
}
