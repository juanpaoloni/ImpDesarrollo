package com.DESO_TP.EntidadesDominio;

import com.DESO_TP.Enumerados.PosicionIVA;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "responsablePago")
@Data
@AllArgsConstructor @NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class ResponsablePago {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idResponsable;
}