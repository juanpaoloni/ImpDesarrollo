/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.Services;

import com.DESO_TP.DESO_backend.DataAccessObject.FacturaDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.OcupacionDAO;
import com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities.FacturaRequest;
import com.DESO_TP.DESO_backend.Services.FactoryMethod.ResponsablePagoFactory;
import com.DESO_TP.EntidadesDominio.Factura;
import com.DESO_TP.EntidadesDominio.Ocupacion;
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
    private FacturaDAO facturaRepository;

    @Autowired
    private OcupacionDAO ocupacionRepository;
    
    @Autowired
    private ResponsablePagoFactory responsablePagoFactory;

    public ResponseEntity<Long> cargarFactura(FacturaRequest req) {

        Factura nueva = new Factura();
        nueva.setEstado(EstadoFactura.GENERADA);
        nueva.setFecha(LocalDate.now());
        nueva.setMontoTotal(req.getMonto());

        ResponsablePago responsable =
            responsablePagoFactory.obtener(
                req.getTipoResponsable(), // puede ser persona "FISICA" o "JURIDICA"
                req.getIdResponsable()
            );

        nueva.setResponsable(responsable);

        Ocupacion o = ocupacionRepository.findById(req.getIdOcupacion())
            .orElseThrow(() -> new RuntimeException("Ocupacion no encontrada"));

        nueva.setOcupacion(o);
        nueva.setNotaCredito(null);

        facturaRepository.save(nueva);

        return ResponseEntity.ok(nueva.getNumeroFactura());
    }

    
    
    
}
