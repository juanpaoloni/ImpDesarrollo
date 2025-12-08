// fileName: FacturacionService.java

package com.DESO_TP.DESO_backend.Services;

import com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities.FacturaRequest;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.OcupacionResponse;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.HuespedResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalTime; // Ya no es necesario, se puede quitar
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FacturacionService {
    
    private final OcupacionService ocupacionService;
    private final HuespedService huespedService;

    public OcupacionResponse buscarOcupantesPorFacturaRequest(FacturaRequest request) {

        Integer numeroHabitacion;
        try {
            numeroHabitacion = request.getNumeroDeHabitacion(); 
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Datos de entrada inválidos (Habitación debe ser número).");
        }
        
        List<OcupacionResponse> ocupaciones = ocupacionService
                .obtenerOcupacionPorNumeroHabitacion(numeroHabitacion); 

        if (ocupaciones.isEmpty()) {
            throw new RuntimeException("No se encontró una ocupación activa para esa habitación.");
        }
        
        OcupacionResponse ocupacionPrincipal = ocupaciones.get(0);
        
        List<HuespedResponse> huespedesDetalle = ocupacionPrincipal.getIdsHuespedes().stream()
                .map(id -> huespedService.obtenerHuesped(id.getTipoDocumento(), id.getNumeroDocumento()))
                .collect(Collectors.toList());

        OcupacionResponse response = new OcupacionResponse();
        
        response.setNumeroHabitacion(request.getNumeroDeHabitacion());
        response.setIdOcupacion(ocupacionPrincipal.getIdOcupacion());
        response.setHuespedes(huespedesDetalle);
              
        return response;
    }
}