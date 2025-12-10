/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.DESO_TP.DESO_backend.DataAccessObject;

import com.DESO_TP.EntidadesDominio.CancelacionReserva;
import com.DESO_TP.EntidadesDominio.IDs.CancelacionReservaId;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author jauni
 */
@Repository
public interface CancelacionReservaDAO extends CrudRepository<CancelacionReserva, CancelacionReservaId> {
    
}
