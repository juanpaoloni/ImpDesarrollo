/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.Services;

import com.DESO_TP.DESO_backend.DataAccessObject.FueraDeServicioDAO;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.FueraDeServicioResponse;
import com.DESO_TP.EntidadesDominio.FueraDeServicio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author jauni
 */

@Service
public class FueraDeServicioService {
    
    @Autowired
    private FueraDeServicioDAO fueraDeServicioRepository;
    
    public List<FueraDeServicioResponse> obtenerFueraDeServicioPorNumeroHabitacion(Integer numeroHabitacion){
        List<FueraDeServicio> fueraDeServicioLista = fueraDeServicioRepository.findByHabitacion_NumeroHabitacion(numeroHabitacion);
        return fueraDeServicioLista.stream().map(FueraDeServicioResponse::toResponse).toList();
    }
   
    
}
