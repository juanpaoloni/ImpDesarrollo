/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.Services;

import com.DESO_TP.DESO_backend.DataAccessObject.CancelacionReservaDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.HabitacionDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.ReservaDAO;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.ReservaResponse;
import com.DESO_TP.DESO_backend.Utils.TextoUtils;
import com.DESO_TP.EntidadesDominio.CancelacionReserva;
import com.DESO_TP.EntidadesDominio.Habitacion;
import com.DESO_TP.EntidadesDominio.IDs.CancelacionReservaId;
import com.DESO_TP.EntidadesDominio.Reserva;
import com.DESO_TP.Enumerados.EstadoReserva;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
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
    
    public List<ReservaResponse> obtenerResponsePorNumeroHabitacion(Integer numeroHabitacion){
        List<Reserva> reservas = reservaRepository.findByHabitacion_NumeroHabitacion(numeroHabitacion);
        
        return reservas.stream().map(ReservaResponse::toResponse).toList();
    }
    
    public List<Reserva> obtenerEntidadPorNumeroHabitacion(Integer numeroHabitacion){
        List<Reserva> reservas = reservaRepository.findByHabitacion_NumeroHabitacion(numeroHabitacion);
        
        return reservas;
    }
    
     @Autowired
    private HabitacionDAO habitacionDAO;


    public void crearMultiplesReservas(List<Reserva> reservas) {

        for (Reserva r : reservas) {
            
            r.setEstado(EstadoReserva.ACTIVA);
            LocalDate fechaHoy = LocalDate.now();
            r.setFechaReserva(fechaHoy);
            r.setNombre(TextoUtils.capitalizarTexto(r.getNombre()));
            r.setApellido(TextoUtils.capitalizarTexto(r.getApellido()));
            Habitacion hab = habitacionDAO.findById(r.getHabitacion().getNumeroHabitacion())
                    .orElseThrow(() -> new RuntimeException("Habitación no encontrada"));

            r.setHabitacion(hab);

            reservaRepository.save(r);
        }
    }
    
    public List<ReservaResponse> obtenerReservasCoincidentes(String apellido, String nombre){
        List<Reserva> reservas;
        if(nombre.equals("")){
            reservas = reservaRepository.findByApellido(apellido);
        }
        else{
            reservas = reservaRepository.findByApellidoAndNombre(apellido, nombre);
        }
        return reservas.stream().map(ReservaResponse::toResponse).toList();
    }
    
    @Autowired
    private CancelacionReservaDAO cancelacionRepository;
    
    @Transactional
    public void confirmacionCancelarReserva(Long idReserva, String motivo){
        reservaRepository.actualizarEstado(idReserva, EstadoReserva.CANCELADA);
        Reserva reserva = reservaRepository.findById(idReserva)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));
        
        CancelacionReservaId cancelacionId = new CancelacionReservaId(idReserva, motivo);
        
        CancelacionReserva cancelacion = new CancelacionReserva(cancelacionId, LocalDate.now(), reserva);
        
        cancelacionRepository.save(cancelacion);
    }
    
}
