/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.DESO_TP.DESO_backend.Services.Facade;

import com.DESO_TP.Enumerados.TipoDocumento;

/**
 *
 * @author jauni
 */
public interface HuespedOcupacionFacade {
    public boolean huespedTieneOcupaciones(TipoDocumento tipo, String numero);
}
