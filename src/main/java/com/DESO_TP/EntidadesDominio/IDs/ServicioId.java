/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.EntidadesDominio.IDs;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author jauni
 */

@Data
@AllArgsConstructor @NoArgsConstructor
@Embeddable
public class ServicioId implements Serializable {
    
    @Column(name = "id_ocupacion")
    private Long idOcupacion;
    private String descripcion;
    
}
