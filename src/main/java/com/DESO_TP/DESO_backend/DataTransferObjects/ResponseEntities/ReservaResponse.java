/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities;

/**
 *
 * @author jauni
 */
import com.DESO_TP.EntidadesDominio.Reserva;
import com.DESO_TP.Enumerados.EstadoReserva;
import java.time.LocalDate;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReservaResponse {

    private Long idReserva;
    private LocalDate fechaReserva;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private EstadoReserva estado;
    private String telefono;
    private String nombre;
    private String apellido;
    private HabitacionResponse habitacion;

    public static ReservaResponse toResponse(Reserva r) {
        return ReservaResponse.builder()
            .idReserva(r.getIdReserva())
            .fechaReserva(r.getFechaReserva())
            .fechaInicio(r.getFechaInicio())
            .fechaFin(r.getFechaFin())
            .estado(r.getEstado())
            .telefono(r.getTelefono())
            .nombre(r.getNombre())
            .apellido(r.getApellido())
            .habitacion(HabitacionResponse.toResponse(r.getHabitacion()))
            .build();
    }
}


