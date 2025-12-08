/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.DataAccessObject;

import com.DESO_TP.EntidadesDominio.Ocupacion;
import com.DESO_TP.Enumerados.TipoDocumento;
import java.time.LocalTime;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author jauni
 */
@Repository
public interface OcupacionDAO extends CrudRepository<Ocupacion, Long>{
    List<Ocupacion> findByHabitacion_NumeroHabitacion(Integer numeroHabitacion);
    
    @Query("SELECT o FROM Ocupacion o JOIN o.huespedes h " +
           "WHERE h.tipoDocumento = :tipoDocumento " +
           "AND h.numeroDocumento = :numeroDocumento")
    List<Ocupacion> findByHuesped(
        @Param("tipoDocumento") TipoDocumento tipoDocumento,
        @Param("numeroDocumento") String numeroDocumento
    );
}
