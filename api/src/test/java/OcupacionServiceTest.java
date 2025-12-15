
import com.DESO_TP.DESO_backend.DataAccessObject.OcupacionDAO;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.OcupacionResponse;
import com.DESO_TP.DESO_backend.Services.OcupacionService;
import com.DESO_TP.EntidadesDominio.Ocupacion;
import com.DESO_TP.Enumerados.TipoDocumento;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
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
class OcupacionServiceTest {

    @InjectMocks
    private OcupacionService service;

    @Mock
    private OcupacionDAO ocupacionRepository;

    @Test
    void obtenerResponsePorNumeroHabitacion_devuelveListaResponse() {
        Integer nroHabitacion = 101;

        Ocupacion o1 = new Ocupacion();
        Ocupacion o2 = new Ocupacion();

        when(ocupacionRepository.findByHabitacion_NumeroHabitacion(nroHabitacion))
                .thenReturn(List.of(o1, o2));

        List<OcupacionResponse> result =
                service.obtenerResponsePorNumeroHabitacion(nroHabitacion);

        assertEquals(2, result.size());
        verify(ocupacionRepository).findByHabitacion_NumeroHabitacion(nroHabitacion);
    }

    @Test
    void obtenerResponsePorNumeroHabitacion_sinResultados_devuelveListaVacia() {
        Integer nroHabitacion = 999;

        when(ocupacionRepository.findByHabitacion_NumeroHabitacion(nroHabitacion))
                .thenReturn(List.of());

        List<OcupacionResponse> result =
                service.obtenerResponsePorNumeroHabitacion(nroHabitacion);

        assertTrue(result.isEmpty());
    }

    @Test
    void obtenerEntidadPorNumeroHabitacion_devuelveEntidades() {
        Integer nroHabitacion = 202;

        List<Ocupacion> ocupaciones = List.of(new Ocupacion(), new Ocupacion());

        when(ocupacionRepository.findByHabitacion_NumeroHabitacion(nroHabitacion))
                .thenReturn(ocupaciones);

        List<Ocupacion> result =
                service.obtenerEntidadPorNumeroHabitacion(nroHabitacion);

        assertEquals(ocupaciones, result);
    }

    @Test
    void ocupacionesPorHuesped_devuelveResponses() {
        TipoDocumento tipo = TipoDocumento.DNI;
        String nro = "12345678";

        Ocupacion o1 = new Ocupacion();
        Ocupacion o2 = new Ocupacion();

        when(ocupacionRepository.findByHuesped(tipo, nro))
                .thenReturn(List.of(o1, o2));

        List<OcupacionResponse> result =
                service.ocupacionesPorHuesped(tipo, nro);

        assertEquals(2, result.size());
        verify(ocupacionRepository).findByHuesped(tipo, nro);
    }

    @Test
    void ocupacionesPorHuesped_sinResultados_devuelveListaVacia() {
        TipoDocumento tipo = TipoDocumento.DNI;
        String nro = "00000000";

        when(ocupacionRepository.findByHuesped(tipo, nro))
                .thenReturn(List.of());

        List<OcupacionResponse> result =
                service.ocupacionesPorHuesped(tipo, nro);

        assertTrue(result.isEmpty());
    }
}
