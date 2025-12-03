/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author jauni
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DireccionResponse {

    private Long idDireccion;
    private String calle;
    private Integer numero;
    private String departamento;
    private Integer piso;
    private String codigoPostal;
    private String localidad;
    private String provincia;
    private String pais;

}
