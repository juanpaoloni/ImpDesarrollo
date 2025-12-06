package com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities;

import com.DESO_TP.EntidadesDominio.Huesped;
import com.DESO_TP.EntidadesDominio.Ocupacion;
import com.DESO_TP.EntidadesDominio.ResponsablePago;
import java.util.List;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacturaResponse {
    private Ocupacion ocupacion;
    private double precioEstadia;
    private double precioConsumos;
    private double subtotal;
    private double iva; 
    private double precioTotal;
    private ResponsablePago responsablePago;

}