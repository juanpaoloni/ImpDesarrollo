/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.EntidadesDominio;

import com.DESO_TP.EntidadesDominio.Descuento;
import com.DESO_TP.Enumerados.TipoHabitacion;
import com.DESO_TP.Enumerados.EstadoHabitacion;
import jakarta.persistence.*;
import java.util.*;
import lombok.*;
/**
 *
 * @author mirko
 */
@Entity
@Table(name = "habitacion")
@Data
@AllArgsConstructor @NoArgsConstructor
public class Habitacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer numeroHabitacion;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "tipoHabitacion")
    private TipoHabitacion tipo;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "estadoHabitacion")
    private EstadoHabitacion estado;
    
    @Column
    private String descripcion;
    
    @Column
    private Integer capacidad;
    
    @Column
    private Float costoPorNoche;
    
    @OneToMany(mappedBy = "habitacion")
    private List<Ocupacion> ocupaciones;
    
    @OneToMany(mappedBy = "habitacion")
    private List<Descuento> descuentos;
    
    @OneToMany(mappedBy = "habitacion")
    private List<Reserva> reservas;
}
