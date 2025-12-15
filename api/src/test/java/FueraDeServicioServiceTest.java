
import com.DESO_TP.DESO_backend.DataAccessObject.FueraDeServicioDAO;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.FueraDeServicioResponse;
import com.DESO_TP.DESO_backend.Services.FueraDeServicioService;
import com.DESO_TP.EntidadesDominio.FueraDeServicio;
import com.DESO_TP.EntidadesDominio.Habitacion;
import com.DESO_TP.EntidadesDominio.IDs.FueraDeServicioId;
import java.time.LocalDate;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
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
class FueraDeServicioServiceTest {

    @InjectMocks
    private FueraDeServicioService service;

    @Mock
    private FueraDeServicioDAO fueraDeServicioRepository;

    @Test
    void obtenerResponsePorNumeroHabitacion_devuelveResponses() {

        FueraDeServicioId id =
                new FueraDeServicioId(101, LocalDate.of(2025, 1, 1));

        Habitacion habitacion = new Habitacion();
        habitacion.setNumeroHabitacion(101);

        FueraDeServicio fds = new FueraDeServicio();
        fds.setId(id);
        fds.setFechaFin(LocalDate.of(2025, 1, 5));
        fds.setDescripcion("Mantenimiento");
        fds.setHabitacion(habitacion);

        when(fueraDeServicioRepository
                .findByHabitacion_NumeroHabitacion(101))
                .thenReturn(List.of(fds));

        List<FueraDeServicioResponse> result =
                service.obtenerResponsePorNumeroHabitacion(101);

        assertEquals(1, result.size());

        FueraDeServicioResponse response = result.get(0);
        assertEquals(101, response.getNumeroHabitacion());
        assertEquals(LocalDate.of(2025, 1, 1), response.getFechaInicio());
        assertEquals(LocalDate.of(2025, 1, 5), response.getFechaFin());
        assertEquals("Mantenimiento", response.getDescripcion());
    }


    @Test
    void obtenerEntidadPorNumeroHabitacion_devuelveEntidades() {

        FueraDeServicio f1 = new FueraDeServicio();

        when(fueraDeServicioRepository
                .findByHabitacion_NumeroHabitacion(101))
                .thenReturn(List.of(f1));

        List<FueraDeServicio> result =
                service.obtenerEntidadPorNumeroHabitacion(101);

        assertEquals(1, result.size());
        assertEquals(f1, result.get(0));
    }

    @Test
    void obtenerResponsePorNumeroHabitacion_sinResultados_devuelveListaVacia() {

        when(fueraDeServicioRepository
                .findByHabitacion_NumeroHabitacion(999))
                .thenReturn(List.of());

        List<FueraDeServicioResponse> result =
                service.obtenerResponsePorNumeroHabitacion(999);

        assertEquals(0, result.size());
    }
}
