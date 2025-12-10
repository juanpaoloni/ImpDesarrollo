/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.DESO_TP.DESO_backend.DataAccessObject;

import com.DESO_TP.EntidadesDominio.Reserva;
import com.DESO_TP.Enumerados.EstadoReserva;
import java.util.List;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author jauni
 */
@Repository
public interface ReservaDAO extends CrudRepository<Reserva, Long>{
    List<Reserva> findByHabitacion_NumeroHabitacion(Integer numeroHabitacion);
    
    List<Reserva> findByApellidoAndNombre(String apellido, String nombre);
    
    @Modifying
    @Query("UPDATE Reserva r SET r.estadoReserva = :estado WHERE r.id = :id")
    void actualizarEstado(@Param("id") Long id, @Param("estado") EstadoReserva estado);
}

