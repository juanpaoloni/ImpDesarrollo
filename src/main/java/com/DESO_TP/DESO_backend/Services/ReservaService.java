/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.Services;

import com.DESO_TP.DESO_backend.DataAccessObject.ReservaDAO;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.ReservaResponse;
import com.DESO_TP.EntidadesDominio.Reserva;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author jauni
 */

@Service
public class ReservaService {
    
    @Autowired
    ReservaDAO reservaRepository;
    
    public List<ReservaResponse> obtenerReservaPorNumeroHabitacion(Integer numeroHabitacion){
        List<Reserva> reservas = reservaRepository.findByHabitacion_NumeroHabitacion(numeroHabitacion);
        
        return reservas.stream().map(this::toResponse).toList();
    }
            
    public ReservaResponse toResponse(Reserva r){
        return new ReservaResponse(
            r.getIdReserva(),
            r.getFechaReserva(),
            r.getFechaInicio(),
            r.getFechaFin(),
            r.getEstado(),
            r.getTelefono(),
            r.getNombre(),
            r.getApellido(),
            r.getHabitacion().getNumeroHabitacion());
    }
    
}
