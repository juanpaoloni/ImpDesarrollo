package EntidadesDominio;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "factura")
@Data
@AllArgsConstructor @NoArgsConstructor
public class NotaCredito {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long numeroNotaCredito;
    
    @Column
    private LocalDate fecha;
    
    @Column
    private float monto;
    
    @OneToMany(mappedBy = "factura")
    private List<Factura> facturas;
    
    
}
