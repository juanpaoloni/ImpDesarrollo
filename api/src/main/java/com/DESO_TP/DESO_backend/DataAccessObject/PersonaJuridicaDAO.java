package com.DESO_TP.DESO_backend.DataAccessObject;

import com.DESO_TP.EntidadesDominio.PersonaJuridica;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PersonaJuridicaDAO extends CrudRepository<PersonaJuridica, Long> {
    Optional<PersonaJuridica> findByCuit(String cuit); 
    Boolean existsByCuit(String cuit);
    void deleteByCuit(String cuit);
}