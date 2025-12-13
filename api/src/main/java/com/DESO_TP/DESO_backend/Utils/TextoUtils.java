/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.Utils;

import java.text.Normalizer;
import java.time.LocalDate;

/**
 *
 * @author jauni
 */
public class TextoUtils {
    public static String normalizarString(String s){
    if (s == null) return "";
    String normalizado = Normalizer.normalize(s.toLowerCase(), Normalizer.Form.NFD);
    return normalizado.replaceAll("\\p{M}", "");
    }
    
    public static String capitalizarTexto(String texto){
        if (texto == null || texto.isEmpty()) {
            return texto;
        }
        texto = texto.trim();
        if (texto.isEmpty()) {
            return texto;
        }

        return texto.substring(0, 1).toUpperCase() + texto.substring(1).toLowerCase();
    }

    public static boolean fechaDentroDelRango(LocalDate fechaInicioRango, LocalDate fechaFinRango, LocalDate fechaAVerificar){
        return (fechaAVerificar.isAfter(fechaInicioRango) || 
               fechaAVerificar.isEqual(fechaInicioRango)) &&
               (fechaAVerificar.isBefore(fechaFinRango) || 
               fechaAVerificar.isEqual(fechaFinRango));
    }
}
