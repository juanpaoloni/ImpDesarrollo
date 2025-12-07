/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.Utils;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author jauni
 */
public class ServiceUtils {
    
    public static List<LocalDate> generarRangoFechas(String fechaInicio, String fechaFin){
        LocalDate inicio = LocalDate.parse(fechaInicio);
        LocalDate fin = LocalDate.parse(fechaFin);
        
        List<LocalDate> fechas = new ArrayList();
        
        if(inicio.isAfter(fin)){
            return fechas;
        }
        
        else{
            while(!inicio.isAfter(fin)){
                fechas.add(inicio);
                inicio = inicio.plusDays(1);
            }
        }
        
        return fechas; 
    }
    
    
    public static boolean interseca(LocalDate fechaInicio, LocalDate fechaFin, LocalDate fechaAVerificar){
        return(!fechaAVerificar.isBefore(fechaInicio) && !fechaAVerificar.isAfter(fechaFin));
    }
    
}
