/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.Services.Facade;

import com.DESO_TP.DESO_backend.Services.TemplateMethod.BuscadorEstadoHabitacion;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author jauni
 */
@Service
public class HabitacionEstadoFacadeImpl implements HabitacionEstadoFacade {

    @Autowired
    private List<BuscadorEstadoHabitacion> buscadores;

    @Override
    public String obtenerEstadoHabitacionEnFecha(int numero, LocalDate fecha) {

        for (BuscadorEstadoHabitacion b : buscadores) {
            String estado = b.buscarEstado(numero, fecha);
            if (estado != null) {
                return estado;
            }
        }

        return "LIBRE";
    }
}
