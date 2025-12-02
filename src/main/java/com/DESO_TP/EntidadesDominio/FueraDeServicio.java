/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.EntidadesDominio;



import com.DESO_TP.EntidadesDominio.IDs.FueraDeServicioId;
import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.*;

/**
 *
 * @author jauni
 */

@Entity
@Table(name = "fueraDeServicio")
@Data
@AllArgsConstructor @NoArgsConstructor
public class FueraDeServicio{
    
    @EmbeddedId
    private FueraDeServicioId id;
    
    @Column(name = "fechaFin")
    private LocalDate fechaFin;
    
    @Column(name = "descripcion")
    private String descripcion;
    
    @MapsId("numeroHabitacion") // FK dentro del campo id
    @ManyToOne
    @JoinColumn(name = "numero_Habitacion") // referencia a la tabla habitacion
    private Habitacion habitacion;

}

