/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.Services.TemplateMethod;

import com.DESO_TP.DESO_backend.Services.OcupacionService;
import com.DESO_TP.DESO_backend.Utils.ServiceUtils;
import com.DESO_TP.EntidadesDominio.Ocupacion;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author jauni
 */

@Service
public class BuscadorOcupacion extends BuscadorEstadoHabitacion {

    @Autowired
    private OcupacionService ocupacionService;

    @Override
    protected boolean hayCoincidencia(int numero, LocalDate fecha) {
        for (Ocupacion o : ocupacionService.obtenerEntidadPorNumeroHabitacion(numero)) {
            if (ServiceUtils.interseca(
                    o.getFechaInicio(),
                    o.getFechaFin(),
                    fecha)) {
                return true;
            }
        }
        return false;
    }
    
    @Override
    protected String getEstado() {
        return "OCUPADA";
    }
}
