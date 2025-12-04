package com.DESO_TP.DESO_backend.Controllers;

import Enumerados.TipoDocumento;
import com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities.HuespedRequest;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.HuespedResponse;
import com.DESO_TP.DESO_backend.Services.HuespedService;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/huespedes")
@CrossOrigin(origins = "http://localhost:3000")
public class HuespedController {

    @Autowired
    private HuespedService service;

    @PostMapping("/darDeAlta")
    public ResponseEntity<HuespedResponse> guardar(@RequestBody HuespedRequest request) {
        HuespedResponse respuesta = service.crearHuesped(request);
        return ResponseEntity.ok(respuesta);
    }
    
    @DeleteMapping("/darDeBaja/{tipo}/{numero}")
    public ResponseEntity<String> borrar(@PathVariable TipoDocumento tipo, @PathVariable String numero) {
        //
        // FALTA VERIFICAR QUE NO TENGA OCUPACIONES
        //

        service.eliminarHuesped(tipo, numero);
        return ResponseEntity.ok("Huésped eliminado correctamente.");
    }
    
    @GetMapping("/buscarHuespedes")
    public List<HuespedResponse> buscarHuespedes(
        @RequestParam(required = false) String nombre,
        @RequestParam(required = false) String apellido,
        @RequestParam(required = false) String tipoDocumento,
        @RequestParam(required = false) String nroDocumento
    ) {
        return service.buscarHuespedes(nombre, apellido, tipoDocumento, nroDocumento);
    }
}