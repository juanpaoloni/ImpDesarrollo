/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.EntidadesDominio.IDs;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.time.LocalDate;
import lombok.*;

/**
 *
 * @author jauni
 */

@Data
@AllArgsConstructor @NoArgsConstructor
@Embeddable
public class FueraDeServicioId implements Serializable {
    
    @Column(name = "numero_Habitacion")
    private Integer numeroHabitacion;
    private LocalDate fechaInicio;
    
}
