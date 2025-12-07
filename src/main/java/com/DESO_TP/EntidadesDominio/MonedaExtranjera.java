package com.DESO_TP.EntidadesDominio;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "monedaExtranjera")
@Data
@AllArgsConstructor @NoArgsConstructor
public class MonedaExtranjera extends MedioPago{
    @Column
    private String moneda;
    
    @Column
    private float cotizacion;
}
