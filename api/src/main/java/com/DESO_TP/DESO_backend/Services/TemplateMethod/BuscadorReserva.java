/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.Services.TemplateMethod;

import com.DESO_TP.DESO_backend.Services.ReservaService;
import com.DESO_TP.DESO_backend.Utils.ServiceUtils;
import com.DESO_TP.EntidadesDominio.Reserva;
import com.DESO_TP.Enumerados.EstadoReserva;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author jauni
 */

@Service
public class BuscadorReserva extends BuscadorEstadoHabitacion {

    @Autowired
    private ReservaService reservaService;

    @Override
    protected boolean hayCoincidencia(int numero, LocalDate fecha) {
        for (Reserva r : reservaService.obtenerEntidadPorNumeroHabitacion(numero)) {
            if (ServiceUtils.interseca(
                    r.getFechaInicio(),
                    r.getFechaFin(),
                    fecha)
                && r.getEstado() != EstadoReserva.CANCELADA) {
                return true;
            }
        }
        return false;
    }

    @Override
    protected String getEstado() {
        return "RESERVADA";
    }
}
