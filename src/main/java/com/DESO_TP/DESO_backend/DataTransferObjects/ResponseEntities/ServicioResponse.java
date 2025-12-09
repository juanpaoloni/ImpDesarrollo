/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities;

/**
 *
 * @author jauni
 */
import com.DESO_TP.EntidadesDominio.Servicio;
import com.DESO_TP.Enumerados.TipoServicio;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServicioResponse {

    private Long idOcupacion;       // Id de la ocupacion asociada
    private TipoServicio tipo;
    private String descripcion;
    private Float costoTotal;

    // Método estático para mapear de entidad a DTO
    public static ServicioResponse toResponse(Servicio s) {
        if (s == null) return null;

        return new ServicioResponse(
            s.getIdServicio().getIdOcupacion(),
            s.getTipo(),
            s.getIdServicio().getDescripcion(),
            s.getCosto_total()
        );
    }
}
