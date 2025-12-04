/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.DataAccessObject;

import com.DESO_TP.Enumerados.TipoHabitacion;
import com.DESO_TP.EntidadesDominio.Habitacion;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author jauni
 */
@Repository
public interface HabitacionDAO extends CrudRepository<Habitacion, Integer> {
    
    List<Habitacion> findByTipo(TipoHabitacion tipoHabitacion);
    
}
