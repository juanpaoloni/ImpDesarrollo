package com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacturaRequest {
    private Float monto;
    private Long idResponsable;
    private Long idOcupacion;
    private String tipoResponsable;
}