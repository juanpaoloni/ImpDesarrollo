package com.DESO_TP.DESO_backend.Controllers;

import com.DESO_TP.DESO_backend.Services.FacturacionService;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.FacturaResponse;
import com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities.FacturaRequest;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.OcupantesResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/facturar")
public class FacturacionController {

    @Autowired
    private FacturacionService facturacionService;

    @PostMapping("/buscar")
    public ResponseEntity<FacturaResponse> buscarHuespedes(
            @RequestBody FacturaRequest request) { 
        
        try {
            FacturaResponse response = facturacionService.generarFactura(request);
            return ResponseEntity.ok(response); 

        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build(); 
        }
    }
}