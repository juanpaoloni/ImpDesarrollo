/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.Controllers;

import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.OcupacionResponse;
import com.DESO_TP.DESO_backend.Services.OcupacionService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author jauni
 */
@RestController
@RequestMapping("/ocupaciones")
@CrossOrigin(origins = "http://localhost:3000")
public class OcupacionController {
    
    @Autowired
    private OcupacionService service;
    
    @GetMapping("/obtenerPorHabitacion")
    public List<OcupacionResponse> obtenerOcupacionPorNumeroHabitacion(
            @RequestParam(required = true) Integer numeroHabitacion){
        return service.obtenerOcupacionPorNumeroHabitacion(numeroHabitacion);
    }
    
}