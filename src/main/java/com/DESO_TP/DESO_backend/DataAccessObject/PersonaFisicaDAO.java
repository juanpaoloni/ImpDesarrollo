/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.DESO_TP.DESO_backend.DataAccessObject;

import com.DESO_TP.EntidadesDominio.PersonaFisica;
import com.DESO_TP.Enumerados.TipoDocumento;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author jauni
 */
@Repository
public interface PersonaFisicaDAO extends CrudRepository<PersonaFisica, Long> {
    Optional<PersonaFisica> findByHuesped_TipoDocumentoAndHuesped_NumeroDocumento(TipoDocumento tipo, String nro);
}
