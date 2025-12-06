/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.EntidadesDominio;

import com.DESO_TP.Enumerados.EstadoReserva;
import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.*;
/**
 *
 * @author mirko
 */
@Entity
@Table(name = "reserva")
@Data
@AllArgsConstructor @NoArgsConstructor
public class Reserva {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idReserva;
    
    @Column
    private LocalDate fechaReserva;
    
    @Column
    private LocalDate fechaInicio;
    
    @Column
    private LocalDate fechaFin;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "estadoReserva")
    private EstadoReserva estado;
    
    @Column
    private String telefono;
    
    @Column
    private String nombre;
    
    @Column
    private String apellido;
    
    @ManyToOne
    @JoinColumn(name = "numeroHabitacion")
    private Habitacion habitacion;
    
    @OneToOne(mappedBy = "reserva")
    private CancelacionReserva cancelacion;

}
