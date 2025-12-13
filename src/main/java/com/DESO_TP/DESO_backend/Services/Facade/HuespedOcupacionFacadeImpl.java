/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.Services.Facade;

import com.DESO_TP.DESO_backend.Services.HuespedService;
import com.DESO_TP.DESO_backend.Services.OcupacionService;
import com.DESO_TP.Enumerados.TipoDocumento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author jauni
 */

@Service
public class HuespedOcupacionFacadeImpl implements HuespedOcupacionFacade {
    
    @Autowired private OcupacionService ocupacionService;

    @Override
    public boolean huespedTieneOcupaciones(TipoDocumento tipo, String numero){
        return !ocupacionService.ocupacionesPorHuesped(tipo, numero).isEmpty();
    }
    
    
}
