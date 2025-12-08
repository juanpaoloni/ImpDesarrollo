package com.DESO_TP.DESO_backend.Controllers;

import com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities.FacturaRequest;
import com.DESO_TP.DESO_backend.Services.FacturacionService;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.OcupacionResponse;
import java.util.List; // <<<<< IMPORTAR

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/facturar")
public class FacturacionController {

    @Autowired
    private FacturacionService service;

    @PostMapping("/buscar")
    public ResponseEntity<?> buscarFactura(@RequestBody FacturaRequest request) { 
    try {
        List<OcupacionResponse> response = service.buscarOcupacionesParaFacturar(request);
        return ResponseEntity.ok(response); 
    } catch (RuntimeException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage()); 
    }
}
    
}