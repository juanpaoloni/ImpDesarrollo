
import com.DESO_TP.DESO_backend.DataAccessObject.DireccionDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.HuespedDAO;
import com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities.DireccionRequest;
import com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities.HuespedRequest;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.HuespedResponse;
import com.DESO_TP.DESO_backend.Services.HuespedService;
import com.DESO_TP.EntidadesDominio.Direccion;
import com.DESO_TP.EntidadesDominio.Huesped;
import com.DESO_TP.EntidadesDominio.IDs.HuespedId;
import com.DESO_TP.Enumerados.TipoDocumento;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import com.DESO_TP.DESO_backend.Services.Facade.HuespedOcupacionFacade;

@ExtendWith(MockitoExtension.class)
class HuespedServiceTest {

    @Mock
    private HuespedDAO huespedRepository;

    @Mock
    private DireccionDAO direccionRepository;

    @Mock
    private HuespedOcupacionFacade mediator;

    @InjectMocks
    private HuespedService service;

    private Direccion direccionCompleta() {
        Direccion d = new Direccion();
        d.setIdDireccion(10L);
        d.setCalle("Falsa");
        d.setNumero(123);
        return d;
    }

    @Test
    void tieneOcupaciones_ok() {
        when(mediator.huespedTieneOcupaciones(TipoDocumento.DNI, "123"))
                .thenReturn(true);

        boolean resp = service.tieneOcupaciones("DNI", "123");

        assertTrue(resp);
        verify(mediator).huespedTieneOcupaciones(TipoDocumento.DNI, "123");
    }

    @Test
    void buscarHuespedes_filtraCorrectamente() {
        Huesped h = new Huesped();
        h.setNombre("Juan");
        h.setApellido("Lopez");
        h.setTipoDocumento(TipoDocumento.DNI);
        h.setNumeroDocumento("123");

        h.setDireccion(direccionCompleta());

        when(huespedRepository.findAll()).thenReturn(List.of(h));

        List<HuespedResponse> resp =
                service.buscarHuespedes("Juan", "Lopez", "DNI", "123");

        assertEquals(1, resp.size());
    }

    @Test
    void crearHuesped_ok() {
        HuespedRequest req = new HuespedRequest();
        req.setTipoDocumento(TipoDocumento.DNI);
        req.setNumeroDocumento("123");
        req.setNombre("Juan");
        req.setApellido("Lopez");

        DireccionRequest dreq = new DireccionRequest();
        dreq.setCalle("X");
        req.setDireccion(dreq);

        when(direccionRepository.save(any())).thenAnswer(inv -> {
            Direccion d = inv.getArgument(0);
            d.setIdDireccion(10L);
            return d;
        });

        when(huespedRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        HuespedResponse resp = service.crearHuesped(req);

        assertEquals("Juan", resp.getNombre());
        verify(direccionRepository).save(any(Direccion.class));
        verify(huespedRepository).save(any(Huesped.class));
    }

    @Test
    void obtenerHuesped_ok() {
        Huesped h = new Huesped();
        h.setNombre("Ana");

        h.setDireccion(direccionCompleta());

        HuespedId id = new HuespedId(TipoDocumento.DNI, "123");

        when(huespedRepository.findById(id)).thenReturn(Optional.of(h));

        HuespedResponse resp = service.obtenerHuesped(TipoDocumento.DNI, "123");

        assertEquals("Ana", resp.getNombre());
    }

    @Test
    void obtenerHuesped_noEncontrado_throw() {
        HuespedId id = new HuespedId(TipoDocumento.DNI, "123");

        when(huespedRepository.findById(id)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class,
                () -> service.obtenerHuesped(TipoDocumento.DNI, "123"));
    }

    @Test
    void actualizarHuesped_ok() {
        Huesped h = new Huesped();
        h.setDireccion(direccionCompleta());

        HuespedId id = new HuespedId(TipoDocumento.DNI, "123");

        when(huespedRepository.findById(id)).thenReturn(Optional.of(h));

        HuespedRequest req = new HuespedRequest();
        req.setTipoDocumento(TipoDocumento.DNI);
        req.setNumeroDocumento("123");
        req.setNombre("Nuevo");

        DireccionRequest dreq = new DireccionRequest();
        dreq.setCalle("Nueva calle");
        req.setDireccion(dreq);

        HuespedResponse resp = service.actualizarHuesped(req);

        assertEquals("Nuevo", resp.getNombre());
        verify(direccionRepository).save(any(Direccion.class));
        verify(huespedRepository).save(h);
    }

    @Test
    void eliminarHuesped_ok() {
        HuespedId id = new HuespedId(TipoDocumento.LE, "555");

        when(huespedRepository.existsById(id)).thenReturn(true);

        service.eliminarHuesped(TipoDocumento.LE, "555");

        verify(huespedRepository).deleteById(id);
    }

    @Test
    void eliminarHuesped_noEncontrado_throw() {
        HuespedId id = new HuespedId(TipoDocumento.LE, "555");

        when(huespedRepository.existsById(id)).thenReturn(false);

        assertThrows(RuntimeException.class,
                () -> service.eliminarHuesped(TipoDocumento.LE, "555"));
    }
}
