/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.Controllers;

import com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities.FacturaRequest;
import com.DESO_TP.DESO_backend.Services.FacturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author jauni
 */

@RestController
@RequestMapping("/facturas")
@CrossOrigin(origins = "http://localhost:3000")
public class FacturaController {
    
    @Autowired
    private FacturaService service;
    
    @PutMapping("/cargarFactura")
    public ResponseEntity<Long> cargarFactura (@RequestBody FacturaRequest req){
        return service.cargarFactura(req);
    }
    
}
