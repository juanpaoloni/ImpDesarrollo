/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.Services.Mediator;

import com.DESO_TP.DESO_backend.Services.FueraDeServicioService;
import com.DESO_TP.DESO_backend.Services.OcupacionService;
import com.DESO_TP.DESO_backend.Services.ReservaService;
import com.DESO_TP.DESO_backend.Utils.ServiceUtils;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author jauni
 */
@Service
public class HabitacionEstadoMediatorImpl implements HabitacionEstadoMediator {

    @Autowired
    private ReservaService reservaService;

    @Autowired
    private OcupacionService ocupacionService;

    @Autowired
    private FueraDeServicioService fdsService;

    @Override
    public String obtenerEstadoHabitacionEnFecha(int numero, LocalDate fecha) {

        for (var f : fdsService.obtenerEntidadPorNumeroHabitacion(numero)) {
            if (ServiceUtils.interseca(f.getId().getFechaInicio(), f.getFechaFin(), fecha)) {
                return "FDS";
            }
        }

        for (var r : reservaService.obtenerEntidadPorNumeroHabitacion(numero)) {
            if (ServiceUtils.interseca(r.getFechaInicio(), r.getFechaFin(), fecha)) {
                return "RESERVADA";
            }
        }

        for (var o : ocupacionService.obtenerEntidadPorNumeroHabitacion(numero)) {
            if (ServiceUtils.interseca(o.getFechaInicio(), o.getFechaFin(), fecha)) {
                return "OCUPADA";
            }
        }

        return "LIBRE";
    }
}
