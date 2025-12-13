/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.EntidadesDominio;


import com.DESO_TP.EntidadesDominio.IDs.DescuentoId;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import lombok.*;
/**
 *
 * @author mirko
 */

@Entity
@Table(name = "descuento")
@Data
@NoArgsConstructor @AllArgsConstructor
public class Descuento {
    
    @EmbeddedId
    private DescuentoId id;
    
    @Column
    private LocalDate fechaFinVigencia;
    
    @Column
    private Integer plazoMinimoReserva;
    
    @Column
    private Integer porcentajeDescuento;
    
    @MapsId("numeroHabitacion")
    @ManyToOne
    @JoinColumn(name = "numero_Habitacion")
    private Habitacion habitacion;
}
