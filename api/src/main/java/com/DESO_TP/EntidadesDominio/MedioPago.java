package com.DESO_TP.EntidadesDominio;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "medioPago")
@Data
@AllArgsConstructor @NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class MedioPago {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_medioPago;
    
    @Column
    private Double total_aportado;
    
    @ManyToOne
    @JoinColumn(name = "numero_pago")
    private Pago pago;
    
    

}
