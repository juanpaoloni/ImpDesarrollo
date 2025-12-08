/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.Services;

import com.DESO_TP.DESO_backend.DataAccessObject.FueraDeServicioDAO;
import com.DESO_TP.Enumerados.TipoHabitacion;
import com.DESO_TP.DESO_backend.DataAccessObject.HabitacionDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.OcupacionDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.ReservaDAO;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.EstadoHabitacionResponse;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.HabitacionResponse;
import com.DESO_TP.DESO_backend.Utils.ServiceUtils;
import com.DESO_TP.EntidadesDominio.FueraDeServicio;
import com.DESO_TP.EntidadesDominio.Habitacion;
import com.DESO_TP.EntidadesDominio.Ocupacion;
import com.DESO_TP.EntidadesDominio.Reserva;
import com.DESO_TP.Enumerados.EstadoReserva;
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
    private ReservaDAO reservaRepository;
    
    @Autowired
    private OcupacionDAO ocupacionRepository;
    
    @Autowired
    private FueraDeServicioDAO fueraDeServicioRepository;
    
    public List<EstadoHabitacionResponse> obtenerEstadoPorTipo(String tipo, String fechaDesde, String fechaHasta){
        List<Habitacion> habitaciones = 
                tipo.equals("") ? (List<Habitacion>)habitacionRepository.findAll() : 
                habitacionRepository.findByTipo(TipoHabitacion.valueOf(tipo));
        
        List<LocalDate> rangoFechas = ServiceUtils.generarRangoFechas(fechaDesde, fechaHasta);
        
        List<EstadoHabitacionResponse> response = new ArrayList();
        
        for(Habitacion h : habitaciones){
            
            Map<String, String> estadoPorFecha = new LinkedHashMap();
            for(LocalDate fechaAVerificar : rangoFechas){
                
                
                String estado = "LIBRE"; // Situacion inicial hasta que se verifique lo contrario
                List<FueraDeServicio> fds = fueraDeServicioRepository.findByHabitacion_NumeroHabitacion(h.getNumeroHabitacion());
                for(FueraDeServicio f : fds){
                    LocalDate inicio = f.getId().getFechaInicio();
                    LocalDate fin = f.getFechaFin();
                    if(ServiceUtils.interseca(inicio, fin, fechaAVerificar)) { estado = "FDS"; break; }
                }
                
                if(estado.equals("LIBRE")){ // Si ya se verifico que esta fuera de servicio no reviso el resto
                
                    List<Reserva> reservas = reservaRepository.findByHabitacion_NumeroHabitacion(h.getNumeroHabitacion());
                    for(Reserva r : reservas){
                        LocalDate inicio = r.getFechaInicio();
                        LocalDate fin = r.getFechaFin();
                        if(ServiceUtils.interseca(inicio, fin, fechaAVerificar)) { estado = "RESERVADA"; break; }
                    }
                
                }
                
                if(estado.equals("LIBRE")){ // Verifico devuelta si no esta reservada
                
                    List<Ocupacion> ocupaciones = ocupacionRepository.findByHabitacion_NumeroHabitacion(h.getNumeroHabitacion());
                    for(Ocupacion o : ocupaciones){
                        LocalDate inicio = o.getFechaInicio();
                        LocalDate fin = o.getFechaFin();
                        if(ServiceUtils.interseca(inicio, fin, fechaAVerificar)) { estado = "OCUPADA"; break; }
                    }
                
                }
                estadoPorFecha.put(fechaAVerificar.toString(), estado);
                
            }
            
            // Agrego el numero de la habitacion con sus respectivos estados por cada fecha;
            response.add(EstadoHabitacionResponse.toResponse(h.getNumeroHabitacion(), estadoPorFecha));
            
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
