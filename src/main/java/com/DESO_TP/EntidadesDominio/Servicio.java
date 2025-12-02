/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.EntidadesDominio;


import com.DESO_TP.EntidadesDominio.IDs.ServicioId;
import Enumerados.TipoServicio;

import jakarta.persistence.*;
import java.util.List;
import lombok.*;
/**
 *
 * @author mirko
 */

@Entity
@Table(name = "servicio")
@Data
@AllArgsConstructor @NoArgsConstructor
public class Servicio {
    
    @EmbeddedId
    private ServicioId idServicio;
    
    @Enumerated(EnumType.STRING)
    @Column
    private TipoServicio tipo;
    
    @Column
    private Float costo_total;
    
    @MapsId("idOcupacion")
    @ManyToOne
    @JoinColumn(name = "id_ocupacion")
    private Ocupacion ocupacion;
}