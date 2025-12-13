/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.DESO_TP.DESO_backend.DataAccessObject;

import com.DESO_TP.EntidadesDominio.Huesped;
import com.DESO_TP.EntidadesDominio.IDs.HuespedId;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author jauni
 */

@Repository
public interface HuespedDAO extends CrudRepository<Huesped, HuespedId> {
}
