/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.EntidadesDominio.IDs;

import jakarta.persistence.*;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author jauni
 */
@Embeddable
@AllArgsConstructor @NoArgsConstructor
@Data
public class CancelacionReservaId implements Serializable {
    
    @Column(name = "id_reserva")
    private Long idReserva;
    private String motivo; 
}
