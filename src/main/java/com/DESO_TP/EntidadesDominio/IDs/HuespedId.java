/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.EntidadesDominio.IDs;

import Enumerados.TipoDocumento;
import jakarta.persistence.*;
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
public class HuespedId implements Serializable {
    private TipoDocumento tipoDocumento;
    private String numeroDocumento;
}
