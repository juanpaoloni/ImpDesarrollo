package com.DESO_TP.EntidadesDominio;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "tarjetaCredito")
@Data
@AllArgsConstructor @NoArgsConstructor
public class TarjetaDebito extends MedioPago {
    
    @Column
    private String tipoTarjeta;
    
    @Column
    private String numeroTarjeta;
}
