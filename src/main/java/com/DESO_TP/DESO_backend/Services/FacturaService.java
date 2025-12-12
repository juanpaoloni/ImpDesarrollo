/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.Services;

import com.DESO_TP.DESO_backend.DataAccessObject.FacturaDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.OcupacionDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.PersonaFisicaDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.PersonaJuridicaDAO;
import com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities.FacturaRequest;
import com.DESO_TP.EntidadesDominio.Factura;
import com.DESO_TP.EntidadesDominio.Ocupacion;
import com.DESO_TP.EntidadesDominio.PersonaFisica;
import com.DESO_TP.EntidadesDominio.PersonaJuridica;
import com.DESO_TP.EntidadesDominio.ResponsablePago;
import com.DESO_TP.Enumerados.EstadoFactura;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/**
 *
 * @author jauni
 */
@Service
public class FacturaService {
    
    @Autowired
    private PersonaFisicaDAO pfRepository;
            
    @Autowired
    private PersonaJuridicaDAO pjRepository;
    
    @Autowired
    private FacturaDAO facturaRepository;

    @Autowired
    private OcupacionDAO ocupacionRepository;
    
    public ResponseEntity<Long> cargarFactura(FacturaRequest req) {
        Factura nueva = new Factura();
        nueva.setEstado(EstadoFactura.GENERADA);
        nueva.setFecha(LocalDate.now());
        nueva.setMontoTotal(req.getMonto());
        
        ResponsablePago responsableProxy;
        if(req.getTipoResponsable().equals("FISICA")) {
            responsableProxy = pfRepository.findById(req.getIdResponsable())
                .orElseThrow(() -> new RuntimeException("Responsable no encontrado"));
        } else {
            responsableProxy = pjRepository.findById(req.getIdResponsable())
                .orElseThrow(() -> new RuntimeException("Responsable no encontrado"));
        }
        
        nueva.setResponsable(responsableProxy);
        
        Ocupacion o = ocupacionRepository.findById(req.getIdOcupacion())
                    .orElseThrow(() -> new RuntimeException("Ocupacion no encontrada"));
        
        nueva.setOcupacion(o);
        
        nueva.setNotaCredito(null);
        
        facturaRepository.save(nueva);
        
        return ResponseEntity.ok(nueva.getNumeroFactura());
    }
    
    
    
}
