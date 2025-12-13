/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities;

import com.DESO_TP.EntidadesDominio.Direccion;
import com.DESO_TP.EntidadesDominio.Huesped;
import com.DESO_TP.Enumerados.PosicionIVA;
import com.DESO_TP.Enumerados.TipoDocumento;
import java.time.LocalDate;
import lombok.*;

/**
 *
 * @author jauni
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HuespedResponse {

    private TipoDocumento tipoDocumento;
    private String numeroDocumento;

    private String nombre;
    private String apellido;
    private String CUIT;
    private PosicionIVA posicionIVA;
    private LocalDate fechaNacimiento;
    private String nacionalidad;
    private String email;
    private String telefono;
    private String ocupacion;

    private DireccionResponse direccion;
    
    public static HuespedResponse toResponse(Huesped h) {

        Direccion d = h.getDireccion();

        DireccionResponse direccionDTO = DireccionResponse.builder()
                .idDireccion(d.getIdDireccion())
                .calle(d.getCalle())
                .numero(d.getNumero())
                .departamento(d.getDepartamento())
                .piso(d.getPiso())
                .codigoPostal(d.getCodigoPostal())
                .localidad(d.getLocalidad())
                .provincia(d.getProvincia())
                .pais(d.getPais())
                .build();

        return HuespedResponse.builder()
                .tipoDocumento(h.getTipoDocumento())
                .numeroDocumento(h.getNumeroDocumento())
                .nombre(h.getNombre())
                .apellido(h.getApellido())
                .CUIT(h.getCUIT())
                .posicionIVA(h.getPosicionIVA())
                .fechaNacimiento(h.getFechaNacimiento())
                .nacionalidad(h.getNacionalidad())
                .email(h.getEmail())
                .telefono(h.getTelefono())
                .ocupacion(h.getOcupacion())
                .direccion(direccionDTO)
                .build();
    }
}

