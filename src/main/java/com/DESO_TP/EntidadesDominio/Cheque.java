package com.DESO_TP.EntidadesDominio;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "cheque")
@Data
@AllArgsConstructor @NoArgsConstructor
public class Cheque extends MedioPago{
    @Column
    private String numeroCheque;
    
    @Column
    private String banco;
    
    @Column
    private String plaza;
    
    @Column
    private LocalDate fechaCobro;
}
