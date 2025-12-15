
import com.DESO_TP.DESO_backend.DataAccessObject.HabitacionDAO;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.EstadoHabitacionResponse;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.HabitacionResponse;
import com.DESO_TP.DESO_backend.Services.Facade.HabitacionEstadoFacade;
import com.DESO_TP.DESO_backend.Services.HabitacionService;
import com.DESO_TP.DESO_backend.Utils.ServiceUtils;
import com.DESO_TP.EntidadesDominio.Habitacion;
import com.DESO_TP.Enumerados.TipoHabitacion;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author jauni
 */
@ExtendWith(MockitoExtension.class)
class HabitacionServiceTest {

    @InjectMocks
    private HabitacionService service;

    @Mock
    private HabitacionDAO habitacionRepository;

    @Mock
    private HabitacionEstadoFacade facade;

    @Test
    void obtenerEstadoPorTipo_sinTipo_devuelveEstadosPorFecha() {
        Habitacion h1 = new Habitacion();
        h1.setNumeroHabitacion(101);

        when(habitacionRepository.findAll())
                .thenReturn(List.of(h1));

        LocalDate d1 = LocalDate.of(2025, 1, 1);
        LocalDate d2 = LocalDate.of(2025, 1, 2);

        try (MockedStatic<ServiceUtils> utils =
                Mockito.mockStatic(ServiceUtils.class, Mockito.CALLS_REAL_METHODS)) {

            utils.when(() -> ServiceUtils.generarRangoFechas("2025-01-01", "2025-01-02"))
                    .thenReturn(List.of(d1, d2));

            when(facade.obtenerEstadoHabitacionEnFecha(101, d1))
                    .thenReturn("OCUPADA");
            when(facade.obtenerEstadoHabitacionEnFecha(101, d2))
                    .thenReturn("LIBRE");

            List<EstadoHabitacionResponse> result =
                    service.obtenerEstadoPorTipo("", "2025-01-01", "2025-01-02");

            assertEquals(1, result.size());
            verify(facade, times(2))
                    .obtenerEstadoHabitacionEnFecha(eq(101), any());
        }
    }

    @Test
    void obtenerHabitacionPorTipo_devuelveResponses() {
        Habitacion h = new Habitacion();
        h.setTipo(TipoHabitacion.DOBLE_ESTANDAR);

        when(habitacionRepository.findByTipo(TipoHabitacion.DOBLE_ESTANDAR))
                .thenReturn(List.of(h));

        List<HabitacionResponse> result =
                service.obtenerHabitacionPorTipo(TipoHabitacion.DOBLE_ESTANDAR);

        assertEquals(1, result.size());
    }

    @Test
    void obtenerTodasHabitaciones_devuelveTodas() {
        when(habitacionRepository.findAll())
                .thenReturn(List.of(new Habitacion(), new Habitacion()));

        List<HabitacionResponse> result =
                service.obtenerTodasHabitaciones();

        assertEquals(2, result.size());
    }

    @Test
    void generarSeleccion_devuelveReservasSimplificadas() {

        Habitacion h = new Habitacion();
        h.setNumeroHabitacion(101);
        h.setTipo(TipoHabitacion.INDIVIDUAL_ESTANDAR);

        when(habitacionRepository.findById(101))
                .thenReturn(Optional.of(h));

        Map<Integer, List<String>> seleccion = new HashMap<>();
        seleccion.put(101, List.of(
                "2025-01-01",
                "2025-01-02"
        ));

        List<String[]> result = service.generarSeleccion(seleccion);

        assertEquals(1, result.size());

        String[] reserva = result.get(0);
        assertEquals("101", reserva[0]);
        assertEquals("INDIVIDUAL_ESTANDAR", reserva[1]);
        assertEquals("2025-01-01", reserva[2]);
        assertEquals("2025-01-02", reserva[3]);
    }


    @Test
    void generarSeleccion_habitacionInexistente_lanzaExcepcion() {
        when(habitacionRepository.findById(999))
                .thenReturn(Optional.empty());

        Map<Integer, List<String>> seleccion = new HashMap<>();
        seleccion.put(999, List.of("2025-01-01"));

        assertThrows(RuntimeException.class,
                () -> service.generarSeleccion(seleccion));
    }
}
