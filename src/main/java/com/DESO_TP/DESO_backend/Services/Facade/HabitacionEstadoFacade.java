/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.DESO_TP.DESO_backend.Services.Facade;

import java.time.LocalDate;

/**
 *
 * @author jauni
 */
public interface HabitacionEstadoFacade {
    public String obtenerEstadoHabitacionEnFecha(int numero, LocalDate fecha);
}
