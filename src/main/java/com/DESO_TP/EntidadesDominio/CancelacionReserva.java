/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.EntidadesDominio;

import com.DESO_TP.EntidadesDominio.IDs.CancelacionReservaId;
import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 *
 * @author mirko
 */

@Entity
@Table(name = "cancelacionReserva")
@Data
@AllArgsConstructor @NoArgsConstructor
public class CancelacionReserva {
    @EmbeddedId
    private CancelacionReservaId id;
    
    @Column
    private LocalDate fechaCancelacion;
    
    @MapsId("idReserva")
    @OneToOne
    @JoinColumn(name = "id_reserva")
    private Reserva reserva;
}
