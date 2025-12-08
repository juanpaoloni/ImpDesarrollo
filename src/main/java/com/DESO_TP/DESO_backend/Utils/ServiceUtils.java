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
    
    public static List<String[]> simplificarRangoFechas(List<String> fechas) {
        List<String[]> rangos = new ArrayList<>();

        if (fechas == null || fechas.isEmpty()) {
            return rangos;
        }
        String fechaInicio = fechas.get(0);
        String fechaAnterior = fechas.get(0);

        for (int i = 1; i < fechas.size(); i++) {
            String fechaActual = fechas.get(i);

            if (!sonConsecutivas(fechaAnterior, fechaActual)) {
                rangos.add(new String[]{fechaInicio, fechaAnterior});
                fechaInicio = fechaActual;
            }

            fechaAnterior = fechaActual;
        }

        rangos.add(new String[]{fechaInicio, fechaAnterior});

        return rangos;
    }

    private static boolean sonConsecutivas(String fecha1, String fecha2) {
        LocalDate f1 = LocalDate.parse(fecha1);
        LocalDate f2 = LocalDate.parse(fecha2);
        return f1.plusDays(1).equals(f2);
    }

}
