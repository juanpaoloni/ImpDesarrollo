/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.Services.FactoryMethod;

import com.DESO_TP.DESO_backend.DataAccessObject.PersonaFisicaDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.PersonaJuridicaDAO;
import com.DESO_TP.EntidadesDominio.ResponsablePago;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author jauni
 */
@Service
public class ResponsablePagoFactory {

    @Autowired
    private PersonaFisicaDAO pfRepository;

    @Autowired
    private PersonaJuridicaDAO pjRepository;

    public ResponsablePago obtener(String tipo, Long id) {
        if ("FISICA".equals(tipo)) {
            return pfRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Responsable no encontrado"));
        }
        if ("JURIDICA".equals(tipo)) {
            return pjRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Responsable no encontrado"));
        }
        throw new IllegalArgumentException("Tipo de responsable inválido");
    }
}

