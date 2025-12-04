/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities;

/**
 *
 * @author jauni
 */
import com.DESO_TP.Enumerados.TipoHabitacion;
import com.DESO_TP.Enumerados.EstadoHabitacion;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HabitacionResponse {

    private Integer numeroHabitacion;

    private TipoHabitacion tipo;

    private EstadoHabitacion estado;

    private String descripcion;

    private Integer capacidad;

    private Float costoPorNoche;
}