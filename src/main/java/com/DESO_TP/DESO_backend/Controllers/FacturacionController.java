package com.DESO_TP.DESO_backend.Controllers;

import com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities.FacturaRequest;
import com.DESO_TP.DESO_backend.Services.FacturacionService;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.OcupacionResponse;
import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/facturar")
public class FacturacionController {

    @Autowired
    private FacturacionService service;


}
   