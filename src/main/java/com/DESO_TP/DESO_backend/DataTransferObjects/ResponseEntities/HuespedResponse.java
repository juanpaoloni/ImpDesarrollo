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

    private DireccionResponse direccion; // devolvés el DTO completo
    
    public static HuespedResponse toResponse(Huesped h) {

        Direccion d = h.getDireccion();

        DireccionResponse direccionDTO = new DireccionResponse(
                d.getIdDireccion(),
                d.getCalle(),
                d.getNumero(),
                d.getDepartamento(),
                d.getPiso(),
                d.getCodigoPostal(),
                d.getLocalidad(),
                d.getProvincia(),
                d.getPais()
        );

        return new HuespedResponse(
                h.getTipoDocumento(),
                h.getNumeroDocumento(),
                h.getNombre(),
                h.getApellido(),
                h.getCUIT(),
                h.getPosicionIVA(),
                h.getFechaNacimiento(),
                h.getNacionalidad(),
                h.getEmail(),
                h.getTelefono(),
                h.getOcupacion(),
                direccionDTO
        );
    }
}
