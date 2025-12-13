/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.Services.TemplateMethod;

import com.DESO_TP.DESO_backend.Services.FueraDeServicioService;
import com.DESO_TP.DESO_backend.Utils.ServiceUtils;
import com.DESO_TP.EntidadesDominio.FueraDeServicio;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author jauni
 */

@Service
public class BuscadorFueraDeServicio extends BuscadorEstadoHabitacion {

    @Autowired
    private FueraDeServicioService fdsService;

    @Override
    protected boolean hayCoincidencia(int numero, LocalDate fecha) {
        for (FueraDeServicio f : fdsService.obtenerEntidadPorNumeroHabitacion(numero)) {
            if (ServiceUtils.interseca(
                    f.getId().getFechaInicio(),
                    f.getFechaFin(),
                    fecha)) {
                return true;
            }
        }
        return false;
    }

    @Override
    protected String getEstado() {
        return "FDS";
    }
}
