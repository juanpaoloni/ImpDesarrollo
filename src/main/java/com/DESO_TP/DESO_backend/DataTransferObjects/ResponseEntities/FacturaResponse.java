package com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities;

import com.DESO_TP.EntidadesDominio.Habitacion;
import com.DESO_TP.EntidadesDominio.Huesped;
import com.DESO_TP.EntidadesDominio.ResponsablePago;
import com.DESO_TP.Enumerados.TipoHabitacion;
import java.util.Date;
import java.util.List;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FacturaResponse {
    private Habitacion habitacion;
    private Date checkin;
    private Date checkout;
    private List <Huesped> listaHuespedes;
    private double precioEstadia;
    private double precioConsumos;
    private double subtotal;
    private double iva; 
    private double precioTotal;
    private ResponsablePago responsablePago;

}