/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.Controllers;

import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.ReservaResponse;
import com.DESO_TP.DESO_backend.Services.ReservaService;
import com.DESO_TP.EntidadesDominio.Reserva;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author jauni
 */

@RestController
@RequestMapping("/reservas")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservaController {
    
    @Autowired
    private ReservaService service;
    
    @GetMapping("/obtenerPorHabitacion")
    public List<ReservaResponse> obtenerReservaPorNumeroHabitacion(
            @RequestParam(required = true) Integer numeroHabitacion){
        return service.obtenerReservaPorNumeroHabitacion(numeroHabitacion);
    }
    @PostMapping("/crearMultiples")
    public ResponseEntity<?> crearMultiplesReservas(@RequestBody List<Reserva> reservas) {
        try {
            service.crearMultiplesReservas(reservas);
            return ResponseEntity.ok("Reservas creadas con éxito");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al crear reservas: " + e.getMessage());
        }
    }
    
    @GetMapping("/obtenerReservasPorPersona")
    public List<ReservaResponse> obtenerReservasPorPersona(
        @RequestParam (required = true) String apellido,
        @RequestParam (required = true) String nombre){
        
        return service.obtenerReservasCoincidentes(apellido, nombre);
    }
}

    

