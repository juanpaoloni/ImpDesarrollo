/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.Services;

import Enumerados.TipoHabitacion;
import com.DESO_TP.DESO_backend.DataAccessObject.HabitacionDAO;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.HabitacionResponse;
import com.DESO_TP.EntidadesDominio.Habitacion;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author jauni
 */

@Service
public class HabitacionService {
    
    @Autowired
    private HabitacionDAO habitacionRepository;
    
    public List<HabitacionResponse> obtenerHabitacionPorTipo(TipoHabitacion tipo) {
        List<Habitacion> habitaciones = habitacionRepository.findByTipo(tipo);

        return habitaciones.stream().map(this::toResponse).toList();
    }
    public List<HabitacionResponse> obtenerTodasHabitaciones() {
        List<Habitacion> habitaciones = (List<Habitacion>)habitacionRepository.findAll();

        return habitaciones.stream().map(this::toResponse).toList();
    }
    
    public HabitacionResponse toResponse(Habitacion h) {
    return new HabitacionResponse(
        h.getNumeroHabitacion(),
        h.getTipo(),
        h.getEstado(),
        h.getDescripcion(),
        h.getCapacidad(),
        h.getCostoPorNoche()
    );
}

    
}
