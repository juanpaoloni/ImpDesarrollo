package com.DESO_TP.DESO_backend.Services;

import com.DESO_TP.DESO_backend.DataAccessObject.PersonaJuridicaDAO;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.PersonaJuridicaResponse;
import com.DESO_TP.EntidadesDominio.PersonaJuridica;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class PersonaJuridicaService {
    
    private final PersonaJuridicaDAO responsablePagoRepository; 

    @Autowired 
    public PersonaJuridicaService(PersonaJuridicaDAO responsablePagoRepository) {
        this.responsablePagoRepository = responsablePagoRepository;
    }

    public PersonaJuridicaResponse buscarResponsablePorCUIT(String cuit) {
        

        Optional<PersonaJuridica> responsableOpt = responsablePagoRepository.findByCuit(cuit);

        if (responsableOpt.isEmpty()) {
            return null; 
        }

        PersonaJuridica juridica = responsableOpt.get();
        
        return new PersonaJuridicaResponse(
            "JURIDICA",
            juridica.getRazonSocial(), 
            juridica.getCuit()         
        );
    }
}