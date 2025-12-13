
import com.DESO_TP.DESO_backend.DataAccessObject.CancelacionReservaDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.HabitacionDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.ReservaDAO;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.ReservaResponse;
import com.DESO_TP.DESO_backend.Services.ReservaService;
import com.DESO_TP.EntidadesDominio.CancelacionReserva;
import com.DESO_TP.EntidadesDominio.Habitacion;
import com.DESO_TP.EntidadesDominio.Reserva;
import com.DESO_TP.Enumerados.EstadoReserva;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class ReservaServiceTest {

    @Mock
    private ReservaDAO reservaRepository;

    @Mock
    private HabitacionDAO habitacionDAO;

    @Mock
    private CancelacionReservaDAO cancelacionRepository;

    @InjectMocks
    private ReservaService service;

    private Habitacion habitacionInstanciaMock() {
        Habitacion h = new Habitacion();
        h.setNumeroHabitacion(10);
        return h;
    }

    @Test
    void obtenerResponsePorNumeroHabitacion_ok() {
        Reserva r = new Reserva();

        r.setHabitacion(habitacionInstanciaMock());

        when(reservaRepository.findByHabitacion_NumeroHabitacion(10))
                .thenReturn(List.of(r));

        List<ReservaResponse> resp =
                service.obtenerResponsePorNumeroHabitacion(10);

        assertEquals(1, resp.size());
    }

    @Test
    void crearMultiplesReservas_ok() {
        Habitacion h = habitacionInstanciaMock();

        Reserva r = new Reserva();
        r.setHabitacion(h);

        when(habitacionDAO.findById(10)).thenReturn(Optional.of(h));

        service.crearMultiplesReservas(List.of(r));

        verify(reservaRepository).save(any(Reserva.class));
    }

    @Test
    void crearMultiplesReservas_habitacionNoExiste_throw() {
        Habitacion h = habitacionInstanciaMock();

        Reserva r = new Reserva();
        r.setHabitacion(h);

        when(habitacionDAO.findById(10)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class,
                () -> service.crearMultiplesReservas(List.of(r)));
    }

    @Test
    void obtenerReservasCoincidentes_soloApellido() {
        Reserva r = new Reserva();
        r.setHabitacion(habitacionInstanciaMock());

        when(reservaRepository.findByApellido("Lopez"))
                .thenReturn(List.of(r));

        List<ReservaResponse> resp =
                service.obtenerReservasCoincidentes("Lopez", "");

        assertEquals(1, resp.size());
    }

    @Test
    void obtenerReservasCoincidentes_apellidoYNombre() {
        Reserva r = new Reserva();
        r.setHabitacion(habitacionInstanciaMock());

        when(reservaRepository.findByApellidoAndNombre("Lopez", "Ana"))
                .thenReturn(List.of(r));

        List<ReservaResponse> resp =
                service.obtenerReservasCoincidentes("Lopez", "Ana");

        assertEquals(1, resp.size());
    }

    @Test
    void confirmacionCancelarReserva_ok() {
        Reserva r = new Reserva();
        r.setIdReserva(10L);
        r.setHabitacion(habitacionInstanciaMock()); 

        when(reservaRepository.findById(10L)).thenReturn(Optional.of(r));

        service.confirmacionCancelarReserva(10L, "Motivo");

        verify(reservaRepository).actualizarEstado(10L, EstadoReserva.CANCELADA);
        verify(cancelacionRepository).save(any(CancelacionReserva.class));
    }

    @Test
    void confirmacionCancelarReserva_noExiste_throw() {
        when(reservaRepository.findById(10L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class,
                () -> service.confirmacionCancelarReserva(10L, "Motivo"));
    }
}
