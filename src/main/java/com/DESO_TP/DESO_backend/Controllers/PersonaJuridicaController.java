package com.DESO_TP.DESO_backend.Controllers;

import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.PersonaJuridicaResponse;
import com.DESO_TP.DESO_backend.Services.PersonaJuridicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/responsables")
@CrossOrigin(origins = "http://localhost:3000")
public class PersonaJuridicaController {

    @Autowired
    private PersonaJuridicaService service;

    @GetMapping("/buscarPorCUIT")
    public ResponseEntity<PersonaJuridicaResponse> buscarResponsablePorCUIT(@RequestParam String cuit) {
        PersonaJuridicaResponse respuesta = service.buscarResponsablePorCUIT(cuit);
        
        if (respuesta == null) {
            return ResponseEntity.notFound().build(); 
        }
        return ResponseEntity.ok(respuesta);
    }
}