package com.DESO_TP.DESO_backend.Services;

import com.DESO_TP.DESO_backend.DataAccessObject.OcupacionDAO;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.OcupacionResponse;
import com.DESO_TP.EntidadesDominio.IDs.HuespedId;
import com.DESO_TP.EntidadesDominio.Ocupacion;
import com.DESO_TP.Enumerados.TipoDocumento;
import java.time.LocalTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OcupacionService {
    
    @Autowired
    private OcupacionDAO ocupacionRepository;
    
    // Necesitamos este método para que FacturacionService lo use
    public List<OcupacionResponse> obtenerOcupacionPorNumeroHabitacionYHoraSalida(
            Integer numeroHabitacion, LocalTime horaSalida) {
        
        // CORRECCIÓN: Usamos el método findByHabitacion_NumeroHabitacionAndHoraSalida
        List<Ocupacion> ocupaciones = ocupacionRepository
                .findByNumeroHabitacionAndHoraSalida(numeroHabitacion, horaSalida);
        
        return ocupaciones.stream().map(this::toResponse).toList();
    }
    
    public List<OcupacionResponse> obtenerOcupacionPorNumeroHabitacion(Integer numeroHabitacion){
        List<Ocupacion> ocupaciones = ocupacionRepository.findByHabitacion_NumeroHabitacion(numeroHabitacion);
        
        return ocupaciones.stream().map(this::toResponse).toList();
    }
    
    public List<OcupacionResponse> ocupacionesPorHuesped(TipoDocumento tipoDocumento, String nroDocumento) {
        List<Ocupacion> ocupaciones = ocupacionRepository.findByHuesped(tipoDocumento, nroDocumento);
        
        return ocupaciones.stream().map(this::toResponse).toList();
    }
            
    public OcupacionResponse toResponse(Ocupacion ocupacion) {
        OcupacionResponse response = new OcupacionResponse();
        response.setIdOcupacion(ocupacion.getIdOcupacion());
        response.setFechaInicio(ocupacion.getFechaInicio());
        response.setFechaFin(ocupacion.getFechaFin());
        response.setHoraSalida(ocupacion.getHoraSalida()); 
        response.setEstado(ocupacion.getEstado());

        if(ocupacion.getHabitacion() != null)
            response.setNumeroHabitacion(ocupacion.getHabitacion().getNumeroHabitacion());

        response.setIdsFactura(
            ocupacion.getFactura() != null ?
            ocupacion.getFactura().stream().map(f -> f.getNumeroFactura()).toList() :
            List.of()
        );

        response.setIdsHuespedes(
            ocupacion.getHuespedes() != null ?
            ocupacion.getHuespedes()
                .stream()
                .map(h -> new HuespedId(h.getTipoDocumento(), h.getNumeroDocumento()))
                .toList()
            :
            List.of()
        );

        return response;
    }
}
