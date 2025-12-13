package com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DireccionRequest {

    private String calle;
    private Integer numero;
    private String departamento;
    private Integer piso;
    private String codigoPostal;
    private String localidad;
    private String provincia;
    private String pais;

}
