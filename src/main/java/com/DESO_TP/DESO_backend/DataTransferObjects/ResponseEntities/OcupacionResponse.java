/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities;

/**
 *
 * @author jauni
 */
import Enumerados.EstadoOcupacion;
import com.DESO_TP.EntidadesDominio.IDs.HuespedId;
import java.time.LocalDate;
import java.util.List;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OcupacionResponse {

    private Long idOcupacion;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private EstadoOcupacion estado;

    // Relación con habitación
    private Integer numeroHabitacion;

    // IDs de facturas
    private List<Long> idsFactura;

    // IDs de servicios
    private List<Long> idsServicios;

    // IDs de huespedes
    private List<HuespedId> idsHuespedes;
}
