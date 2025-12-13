/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.Services.TemplateMethod;

import java.time.LocalDate;

/**
 *
 * @author jauni
 */
public abstract class BuscadorEstadoHabitacion {

    public final String buscarEstado(int numero, LocalDate fecha) {
        if (hayCoincidencia(numero, fecha)) {
            return getEstado();
        }
        return null;
    }

    protected abstract boolean hayCoincidencia(int numero, LocalDate fecha);
    protected abstract String getEstado();
}
