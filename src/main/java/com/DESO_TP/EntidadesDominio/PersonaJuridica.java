package com.DESO_TP.EntidadesDominio;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor @NoArgsConstructor
public class PersonaJuridica extends ResponsablePago {
    
    @Column
    private String razonSocial;
    
    @Column
    private String cuit;
    
    @Column
    private String telefono;
    
    @Column
    private String firmaDigital;
    
    @OneToOne
    @JoinColumn(name = "idDireccion")
    private Direccion direccion;
}
