package com.DESO_TP.EntidadesDominio;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "tarjetaDebito")
@Data
@AllArgsConstructor @NoArgsConstructor
public class TarjetaCredito extends MedioPago {
    
    @Column
    private String tipoTarjeta;
    
    @Column
    private String numeroTarjeta;
    
    @Column
    private Date fechaVencimiento;

}
