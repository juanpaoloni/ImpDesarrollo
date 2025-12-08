/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities;

import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author jauni
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SeleccionReservaRequest {
    private Map<Integer, List<String>> seleccionReserva;
}
