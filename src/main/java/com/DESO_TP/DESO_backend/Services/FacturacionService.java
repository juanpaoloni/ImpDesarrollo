// FacturacionService.java

package com.DESO_TP.DESO_backend.Services;

import com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities.FacturaRequest;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.OcupacionResponse;
// Importaciones de HuespedResponse y Collectos ya no son necesarias
// import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.HuespedResponse;
// import java.util.stream.Collectors; 

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FacturacionService {
    
    private final OcupacionService ocupacionService;

    public List<OcupacionResponse> buscarOcupacionesParaFacturar(FacturaRequest request) {
        
        Integer numeroHabitacion;
        try {
            numeroHabitacion = request.getNumeroDeHabitacion(); 
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Datos de entrada inválidos (Habitación debe ser número).");
        }
        
        List<OcupacionResponse> ocupaciones = ocupacionService
                .obtenerOcupacionPorNumeroHabitacion(numeroHabitacion);

        if (ocupaciones.isEmpty()) {
            throw new RuntimeException("No se encontraron ocupaciones para esa habitación.");
        }

        return ocupaciones;
    }
}