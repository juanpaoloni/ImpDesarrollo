/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.EntidadesDominio;

import Enumerados.EstadoFactura;
import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.*;
import java.util.Date;
import java.util.*;
/**
 *
 * @author mirko
 */

@Entity
@Table(name = "factura")
@Data
@AllArgsConstructor @NoArgsConstructor
public class Factura {
    
    @Enumerated(EnumType.STRING)
    @Column(name = "estadoFactura")
    private EstadoFactura estado;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long numeroFactura;
    
    @Column
    private LocalDate fecha;
    
    @Column
    private Float montoTotal;
    
    @OneToOne
    @JoinColumn(name = "idResponsable")
    private ResponsablePago responsable;
    
    @ManyToOne
    @JoinColumn(name = "idOcupacion")
    private Ocupacion ocupacion;
    
    //@OneToMany(mappedBy = "numeroFactura")
    //private List<Pago> pagos;
    
    @ManyToOne
    @JoinColumn(name = "numeroNotaCredito")
    private NotaCredito notaCredito;
}
