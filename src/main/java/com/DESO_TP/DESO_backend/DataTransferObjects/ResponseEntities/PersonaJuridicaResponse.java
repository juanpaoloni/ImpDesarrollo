package com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonaJuridicaResponse {
    private Long idResponsable;
    private String nombreCompleto;  
    private String CUIT;
}