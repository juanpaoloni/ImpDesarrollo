/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.Services;

import com.DESO_TP.DESO_backend.DataAccessObject.HabitacionDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.ReservaDAO;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.ReservaResponse;
import com.DESO_TP.EntidadesDominio.Habitacion;
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
    private ReservaDAO reservaRepository;
    
    public List<ReservaResponse> obtenerReservaPorNumeroHabitacion(Integer numeroHabitacion){
        List<Reserva> reservas = reservaRepository.findByHabitacion_NumeroHabitacion(numeroHabitacion);
        
        return reservas.stream().map(ReservaResponse::toResponse).toList();
    }
    
     @Autowired
    private HabitacionDAO habitacionDAO;


    public void crearMultiplesReservas(List<Reserva> reservas) {

        for (Reserva r : reservas) {

            Habitacion hab = habitacionDAO.findById(r.getHabitacion().getNumeroHabitacion())
                    .orElseThrow(() -> new RuntimeException("Habitación no encontrada"));

            r.setHabitacion(hab);

            reservaRepository.save(r);
        }
    }
    
}
