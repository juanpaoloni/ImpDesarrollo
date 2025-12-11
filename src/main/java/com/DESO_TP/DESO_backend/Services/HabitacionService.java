/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.Services;

import com.DESO_TP.Enumerados.TipoHabitacion;
import com.DESO_TP.DESO_backend.DataAccessObject.HabitacionDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.ReservaDAO;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.EstadoHabitacionResponse;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.HabitacionResponse;
import com.DESO_TP.DESO_backend.Services.Mediator.HabitacionEstadoMediator;
import com.DESO_TP.DESO_backend.Utils.ServiceUtils;
import com.DESO_TP.EntidadesDominio.Habitacion;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
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
    
    @Autowired
    private HabitacionEstadoMediator estadoMediator;

    public List<EstadoHabitacionResponse> obtenerEstadoPorTipo(String tipo, String fDesde, String fHasta) {

        List<Habitacion> habitaciones =
            tipo.equals("") ? (List<Habitacion>)habitacionRepository.findAll()
                           : habitacionRepository.findByTipo(TipoHabitacion.valueOf(tipo));

        var rango = ServiceUtils.generarRangoFechas(fDesde, fHasta);
        var response = new ArrayList<EstadoHabitacionResponse>();

        for (Habitacion h : habitaciones) {

            Map<String, String> estados = new LinkedHashMap<>();

            for (LocalDate fecha : rango) {
                estados.put(fecha.toString(),
                    estadoMediator.obtenerEstadoHabitacionEnFecha(h.getNumeroHabitacion(), fecha)
                );
            }

            response.add(EstadoHabitacionResponse.toResponse(h.getNumeroHabitacion(), estados));
        }

        return response;
    }

    
    public List<HabitacionResponse> obtenerHabitacionPorTipo(TipoHabitacion tipo) {
        List<Habitacion> habitaciones = habitacionRepository.findByTipo(tipo);

        return habitaciones.stream().map(HabitacionResponse::toResponse).toList();
    }
    public List<HabitacionResponse> obtenerTodasHabitaciones() {
        List<Habitacion> habitaciones = (List<Habitacion>)habitacionRepository.findAll();

        return habitaciones.stream().map(HabitacionResponse::toResponse).toList();
    }

    public List<String[]> generarSeleccion(Map<Integer, List<String>> seleccion) {
     
        List<String[]> reservasSeleccionadas = new ArrayList();
        for(Map.Entry<Integer,List<String>> entry : seleccion.entrySet()){
            
            Integer numHab = entry.getKey();
            Habitacion habitacion = habitacionRepository.findById(numHab)
                    .orElseThrow(() -> new RuntimeException("Habitación no encontrada"));
            
            List<String[]> rangos = ServiceUtils.simplificarRangoFechas(entry.getValue());
            
            for(String[] r : rangos){
                String fechaInicio = r[0];
                String fechaFin = r[1];
                String[] reservaPreview = {String.valueOf(numHab), habitacion.getTipo().toString(), fechaInicio, fechaFin};
                
                reservasSeleccionadas.add(reservaPreview);
            }
        }
        
        return reservasSeleccionadas;
        
    }
    
    @Autowired
    private HabitacionDAO habitacionDAO;

    @Autowired
    private ReservaDAO reservaDAO;



}
