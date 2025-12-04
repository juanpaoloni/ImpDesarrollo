package com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacturaRequest {
    private int numeroDeHabitacion; 
    private String horarioDeSalida;

}