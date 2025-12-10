package com.DESO_TP.DESO_backend.Controllers;

import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.PersonaJuridicaResponse;
import com.DESO_TP.DESO_backend.Services.ResponsablePagoService;
import com.DESO_TP.Enumerados.TipoDocumento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/responsables")
@CrossOrigin(origins = "http://localhost:3000")
public class ResponsablePagoController {

    @Autowired
    private ResponsablePagoService service;

    @GetMapping("/buscarPorCUIT")
    public ResponseEntity<PersonaJuridicaResponse> buscarResponsablePorCUIT(@RequestParam String cuit) {
        PersonaJuridicaResponse respuesta = service.buscarResponsablePorCUIT(cuit);
        
        if (respuesta == null) {
            return ResponseEntity.notFound().build(); 
        }
        return ResponseEntity.ok(respuesta);
    }
    
    @PostMapping("/cargarHuesped") // Carga el huesped como persona fisica si no existe en la bdd
    public ResponseEntity<Long> cargarHuespedComoResponsable(
            @RequestParam(required = true)String tipoDocumento, 
            @RequestParam(required = true)String nroDocumento){
        return service.cargarHuespedComoResponsable(TipoDocumento.valueOf(tipoDocumento), nroDocumento);
    }
    
}