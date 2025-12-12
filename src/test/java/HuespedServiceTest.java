

import com.DESO_TP.DESO_backend.DataAccessObject.DireccionDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.HuespedDAO;
import com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities.DireccionRequest;
import com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities.HuespedRequest;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.HuespedResponse;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.OcupacionResponse;
import com.DESO_TP.DESO_backend.Services.HuespedService;
import com.DESO_TP.DESO_backend.Services.OcupacionService;

import com.DESO_TP.EntidadesDominio.Direccion;
import com.DESO_TP.EntidadesDominio.Huesped;
import com.DESO_TP.Enumerados.TipoDocumento;

import java.time.LocalDate;
import java.util.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class HuespedServiceTest {

    @Mock
    private HuespedDAO huespedRepository;

    @Mock
    private DireccionDAO direccionRepository;

    @Mock
    private OcupacionService ocupacionService;

    @InjectMocks
    private HuespedService service;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    // TIENE OCUPACIONES
    @Test
    void tieneOcupaciones_true() {
        when(ocupacionService.ocupacionesPorHuesped(TipoDocumento.DNI, "123"))
                .thenReturn(List.of(new OcupacionResponse()));

        boolean result = service.tieneOcupaciones("DNI", "123");

        assertTrue(result);
    }

    @Test
    void tieneOcupaciones_false() {
        when(ocupacionService.ocupacionesPorHuesped(TipoDocumento.DNI, "123"))
                .thenReturn(Collections.emptyList());

        boolean result = service.tieneOcupaciones("DNI", "123");

        assertFalse(result);
    }

    // BUSCAR HUESPEDES
    @Test
    void buscarHuespedes_filtradoCorrecto() {
        Huesped h = new Huesped();
        h.setNombre("Juan");
        h.setApellido("Perez");
        h.setTipoDocumento(TipoDocumento.DNI);
        h.setNumeroDocumento("123");

        Direccion d = new Direccion();
        d.setIdDireccion(1L);
        h.setDireccion(d);
        when(huespedRepository.findAll()).thenReturn(List.of(h));

        List<HuespedResponse> result =
                service.buscarHuespedes("juan", "perez", "dni", "123");

        assertEquals(1, result.size());
    }

    @Test
    void buscarHuespedes_noCoincide() {
        when(huespedRepository.findAll()).thenReturn(List.of());

        List<HuespedResponse> result =
                service.buscarHuespedes("juan", "perez", "dni", "123");

        assertTrue(result.isEmpty());
    }

    // CREAR HUESPED
    @Test
    void crearHuesped_ok() {
        HuespedRequest rq = new HuespedRequest();
        rq.setTipoDocumento(TipoDocumento.DNI);
        rq.setNumeroDocumento("123");
        rq.setNombre("Juan");
        rq.setApellido("Perez");
        rq.setFechaNacimiento(LocalDate.of(1990, 5, 20));

        DireccionRequest drq = new DireccionRequest();
        drq.setCalle("Calle Falsa");
        drq.setNumero(123);
        rq.setDireccion(drq);

        when(direccionRepository.save(any())).thenAnswer(i -> i.getArgument(0));
        when(huespedRepository.save(any())).thenAnswer(i -> i.getArgument(0));

        HuespedResponse resp = service.crearHuesped(rq);

        assertNotNull(resp);
        assertEquals("Juan", resp.getNombre());
        assertEquals("Perez", resp.getApellido());

        verify(direccionRepository).save(any(Direccion.class));
        verify(huespedRepository).save(any(Huesped.class));
    }

    // OBTENER HUESPED
    @Test
    void obtenerHuesped_ok() {
        Huesped h = new Huesped();
        h.setNombre("Ana");
        Direccion d = new Direccion();
        d.setIdDireccion(1L);
        h.setDireccion(d);
        when(huespedRepository.findById(any()))
                .thenReturn(Optional.of(h));

        HuespedResponse resp = service.obtenerHuesped(TipoDocumento.DNI, "999");

        assertEquals("Ana", resp.getNombre());
    }

    @Test
    void obtenerHuesped_noExiste() {
        when(huespedRepository.findById(any()))
                .thenReturn(Optional.empty());

        assertThrows(RuntimeException.class,
                () -> service.obtenerHuesped(TipoDocumento.DNI, "999"));
    }

    // ACTUALIZAR HUESPED
    @Test
    void actualizarHuesped_ok() {

        Huesped h = new Huesped();
        h.setTipoDocumento(TipoDocumento.DNI);
        h.setNumeroDocumento("123");
        h.setNombre("Juan");

        Direccion d = new Direccion();
        d.setCalle("Vieja");
        h.setDireccion(d);

        when(huespedRepository.findById(any()))
                .thenReturn(Optional.of(h));

        when(huespedRepository.save(any())).thenAnswer(i -> i.getArgument(0));
        when(direccionRepository.save(any())).thenAnswer(i -> i.getArgument(0));

        HuespedRequest req = new HuespedRequest();
        req.setTipoDocumento(TipoDocumento.DNI);
        req.setNumeroDocumento("123");
        req.setNombre("Juanito");
        req.setApellido("Perez");

        DireccionRequest drq = new DireccionRequest();
        drq.setCalle("Nueva calle");
        req.setDireccion(drq);

        HuespedResponse resp = service.actualizarHuesped(req);

        assertEquals("Juanito", resp.getNombre());
        assertEquals("Perez", resp.getApellido());
        assertEquals("Nueva calle", h.getDireccion().getCalle());
    }

    @Test
    void actualizarHuesped_noExiste() {
        when(huespedRepository.findById(any()))
                .thenReturn(Optional.empty());

        assertThrows(RuntimeException.class,
                () -> service.actualizarHuesped(new HuespedRequest()));
    }

    //ELIMINAR
    @Test
    void eliminarHuesped_ok() {
        when(huespedRepository.existsById(any())).thenReturn(true);

        service.eliminarHuesped(TipoDocumento.DNI, "321");

        verify(huespedRepository).deleteById(any());
    }

    @Test
    void eliminarHuesped_noExiste() {
        when(huespedRepository.existsById(any())).thenReturn(false);

        assertThrows(RuntimeException.class,
                () -> service.eliminarHuesped(TipoDocumento.DNI, "321"));
    }

    //BUSCAR HUESPED POR ID
    @Test
    void buscarHuespedPorId_ok() {
        Huesped h = new Huesped();
        h.setNombre("Roberto");
        Direccion d = new Direccion();
        d.setIdDireccion(1L);
        h.setDireccion(d);

        when(huespedRepository.findById(any()))
                .thenReturn(Optional.of(h));

        HuespedResponse resp =
                service.buscarHuespedPorId(TipoDocumento.DNI, "888");

        assertEquals("Roberto", resp.getNombre());
    }

    @Test
    void buscarHuespedPorId_noExiste() {
        when(huespedRepository.findById(any()))
                .thenReturn(Optional.empty());

        assertThrows(RuntimeException.class,
                () -> service.buscarHuespedPorId(TipoDocumento.DNI, "888"));
    }
}
