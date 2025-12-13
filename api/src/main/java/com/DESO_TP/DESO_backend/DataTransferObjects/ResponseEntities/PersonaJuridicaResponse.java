package com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities;

import com.DESO_TP.EntidadesDominio.PersonaJuridica;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PersonaJuridicaResponse {
    private Long idResponsable;
    private String nombreCompleto;  
    private String CUIT;

    public static PersonaJuridicaResponse toResponse(PersonaJuridica pj) {
        if (pj == null) return null;

        return PersonaJuridicaResponse.builder()
            .idResponsable(pj.getIdResponsable())
            .nombreCompleto(pj.getRazonSocial()) 
            .CUIT(pj.getCuit())
            .build();
    }
}