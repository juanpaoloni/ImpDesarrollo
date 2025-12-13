package com.DESO_TP.EntidadesDominio;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "pago")
@Data
@AllArgsConstructor @NoArgsConstructor
public class Pago {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long numeroPago;
    
    @Column
    private float monto;
    
    @Column
    private LocalDate fecha;

    @OneToMany(mappedBy = "pago")
    private List<MedioPago> medioPago;
    
    @OneToOne
    @JoinColumn(name = "numero_factura")
    private Factura factura;
    
}
