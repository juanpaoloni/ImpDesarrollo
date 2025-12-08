package com.DESO_TP.DESO_backend.Services;

import com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities.FacturaRequest;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.OcupacionResponse;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.HuespedResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FacturacionService {
    
    private final OcupacionService ocupacionService;
    private final HuespedService huespedService;

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
        
        for (OcupacionResponse ocupacion : ocupaciones) {
            List<HuespedResponse> huespedesDetalle = ocupacion.getIdsHuespedes().stream()
                .map(id -> huespedService.obtenerHuesped(id.getTipoDocumento(), id.getNumeroDocumento()))
                .collect(Collectors.toList());
            
            ocupacion.setHuespedes(huespedesDetalle);
        }
              
        return ocupaciones;
    }
}