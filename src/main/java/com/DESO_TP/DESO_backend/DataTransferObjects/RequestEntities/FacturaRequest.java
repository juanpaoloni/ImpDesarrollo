package com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacturaRequest {
    private String numeroDeHabitacion; 
    private String horarioDeSalida;

}