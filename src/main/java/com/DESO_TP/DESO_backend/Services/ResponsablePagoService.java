package com.DESO_TP.DESO_backend.Services;

import com.DESO_TP.DESO_backend.DataAccessObject.HuespedDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.PersonaFisicaDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.PersonaJuridicaDAO;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.PersonaJuridicaResponse;
import com.DESO_TP.EntidadesDominio.Huesped;
import com.DESO_TP.EntidadesDominio.IDs.HuespedId;
import com.DESO_TP.EntidadesDominio.PersonaFisica;
import com.DESO_TP.EntidadesDominio.PersonaJuridica;
import com.DESO_TP.Enumerados.TipoDocumento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import org.springframework.http.ResponseEntity;

@Service
public class ResponsablePagoService {
    
    @Autowired 
    private PersonaJuridicaDAO personaJuridicaRepository; 
    
    @Autowired 
    private PersonaFisicaDAO personaFisicaRepository;
    
    @Autowired
    private HuespedDAO huespedRepository;

    public PersonaJuridicaResponse buscarResponsablePorCUIT(String cuit) {
        

        Optional<PersonaJuridica> responsableOpt = personaJuridicaRepository.findByCuit(cuit);

        if (responsableOpt.isEmpty()) {
            return null; 
        }

        PersonaJuridica juridica = responsableOpt.get();
        
        return new PersonaJuridicaResponse(
            juridica.getIdResponsable(),
            juridica.getRazonSocial(), 
            juridica.getCuit()         
        );
    }
    
    public ResponseEntity<Long> cargarHuespedComoResponsable(TipoDocumento tipo, String nro){
        HuespedId id = new HuespedId(tipo, nro);
        Huesped h = huespedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Huesped no encontrado"));
        
        Optional<PersonaFisica> pf = personaFisicaRepository.
                findByHuesped_TipoDocumentoAndHuesped_NumeroDocumento(tipo,  nro);
        
        if(pf.isPresent()) return ResponseEntity.ok(pf.get().getIdResponsable());
        
        PersonaFisica nueva = new PersonaFisica(h);
        personaFisicaRepository.save(nueva);
        return ResponseEntity.ok(nueva.getIdResponsable());
    }
    
}