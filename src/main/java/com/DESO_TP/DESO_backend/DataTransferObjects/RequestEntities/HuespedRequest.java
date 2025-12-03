/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities;

import Enumerados.PosicionIVA;
import Enumerados.TipoDocumento;
import java.time.LocalDate;
import lombok.*;

/**
 *
 * @author jauni
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HuespedRequest {
   private TipoDocumento tipoDocumento;
   private String numeroDocumento;
   private String nombre;
   private String apellido;
   private String CUIT;
   private PosicionIVA posicionIVA;
   private LocalDate fechaNacimiento;
   private String nacionalidad;
   private String email;
   private String telefono;
   private String ocupacion;
   private DireccionRequest direccion;
}