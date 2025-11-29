/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package EntidadesDominio;

import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 *
 * @author mirko
 */

@Entity
@Table(name = "cancelacionReserva")
@Data
@AllArgsConstructor @NoArgsConstructor
public class CancelacionReserva {
    private LocalDate fechaCancelacion;
    private String motivo;
    private Reserva reserva;
}
