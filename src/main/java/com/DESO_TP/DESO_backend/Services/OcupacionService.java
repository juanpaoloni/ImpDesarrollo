// fileName: OcupacionService.java

package com.DESO_TP.DESO_backend.Services;

import com.DESO_TP.DESO_backend.DataAccessObject.HuespedDAO;
import com.DESO_TP.Enumerados.TipoDocumento;
import com.DESO_TP.DESO_backend.DataAccessObject.OcupacionDAO;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.HuespedResponse;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.OcupacionResponse;
import com.DESO_TP.EntidadesDominio.Huesped;
import com.DESO_TP.EntidadesDominio.IDs.HuespedId;
import com.DESO_TP.EntidadesDominio.Ocupacion;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OcupacionService {
    
    @Autowired
    private OcupacionDAO ocupacionRepository;
    
    @Autowired
    private HuespedService huespedService;

    public List<OcupacionResponse> obtenerOcupacionPorNumeroHabitacion(Integer numeroHabitacion){
        List<Ocupacion> ocupaciones = ocupacionRepository.findByHabitacion_NumeroHabitacion(numeroHabitacion);
        return ocupaciones.stream().map(OcupacionResponse::toResponse).toList();
    }
    
    public List<OcupacionResponse> ocupacionesPorHuesped(TipoDocumento tipoDocumento, String nroDocumento) {
        List<Ocupacion> ocupaciones = ocupacionRepository.findByHuesped(tipoDocumento, nroDocumento);
        
        return ocupaciones.stream().map(OcupacionResponse::toResponse).toList();
    }
    

}