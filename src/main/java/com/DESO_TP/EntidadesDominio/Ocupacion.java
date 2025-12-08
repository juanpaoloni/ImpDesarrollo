/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.EntidadesDominio;

import com.DESO_TP.Enumerados.EstadoOcupacion;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import lombok.*;

/**
 *
 * @author mirko
 */
@Data
@AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "ocupacion")
public class Ocupacion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idOcupacion;
    
    @Column
    private LocalDate fechaInicio;
    
    @Column
    private LocalDate fechaFin;
    
    @Column
    private LocalTime horaSalida;
    
    @Enumerated(EnumType.STRING)
    @Column(name="estadoOcupacion")
    private EstadoOcupacion estado;
    
    @OneToMany(mappedBy = "ocupacion")
    private List<Factura> factura;
    
    @ManyToOne
    @JoinColumn(
        name = "numero_habitacion", 
        referencedColumnName = "numeroHabitacion"
    )
    private Habitacion habitacion;
    
    @ManyToMany(mappedBy = "ocupaciones")
    private List<Huesped> huespedes;
}
