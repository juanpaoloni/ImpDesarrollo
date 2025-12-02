package com.DESO_TP.EntidadesDominio;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public class PersonaFisica extends ResponsablePago {
    
    @OneToOne
    @JoinColumns({
        @JoinColumn(name = "tipoDocumento", referencedColumnName = "tipoDocumento"),
        @JoinColumn(name = "numeroDocumento", referencedColumnName = "numeroDocumento")
          
    })
    private Huesped huesped;
}
