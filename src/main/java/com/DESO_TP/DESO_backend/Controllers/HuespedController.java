package com.DESO_TP.DESO_backend.Controllers;

import com.DESO_TP.Enumerados.TipoDocumento;
import com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities.HuespedRequest;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.HuespedResponse;
import com.DESO_TP.DESO_backend.Services.HuespedService;
import com.DESO_TP.EntidadesDominio.IDs.HuespedId;
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
    
    @GetMapping("/tieneOcupacion")
    public ResponseEntity<Boolean> tieneOcupaciones(
    @RequestParam(required = true) String tipoDocumento, 
    @RequestParam(required = true) String nroDocumento){
        
        return ResponseEntity.ok(service.tieneOcupaciones(tipoDocumento, nroDocumento));
        
    } 
    
    @GetMapping("/buscarPorId")
    public ResponseEntity<HuespedResponse> buscarHuespedPorId(
            @RequestParam(required = true)String tipoDocumento, 
            @RequestParam(required = true)String nroDocumento){
        
        return ResponseEntity.ok(service.buscarHuespedPorId(TipoDocumento.valueOf(tipoDocumento), nroDocumento));
        
    }
    
    @PostMapping("/modificar")
    public ResponseEntity<HuespedResponse> modificarHuesped(@RequestBody HuespedRequest request){
        HuespedResponse respuesta = service.actualizarHuesped(request);
        return ResponseEntity.ok(respuesta);
    }
    
    @GetMapping("/obtenerPosicionIVA")
    public ResponseEntity<String> obtenerPosicionIVA(
    @RequestParam(required = true) String tipoDocumento,
    @RequestParam(required = true)String nroDocumento){
        String respuesta = service.obtenerPosicionIVA(TipoDocumento.valueOf(tipoDocumento), nroDocumento);
        return ResponseEntity.ok(respuesta);
    }
    
    
}