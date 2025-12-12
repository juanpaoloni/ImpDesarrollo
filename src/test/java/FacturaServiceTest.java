
import com.DESO_TP.DESO_backend.DataAccessObject.FacturaDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.OcupacionDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.PersonaFisicaDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.PersonaJuridicaDAO;
import com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities.FacturaRequest;
import com.DESO_TP.DESO_backend.Services.FacturaService;
import com.DESO_TP.EntidadesDominio.Factura;
import com.DESO_TP.EntidadesDominio.Ocupacion;
import com.DESO_TP.EntidadesDominio.PersonaFisica;
import com.DESO_TP.EntidadesDominio.PersonaJuridica;
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
import org.springframework.http.ResponseEntity;

@ExtendWith(MockitoExtension.class)
class FacturaServiceTest {

    @Mock
    private PersonaFisicaDAO pfRepository;

    @Mock
    private PersonaJuridicaDAO pjRepository;

    @Mock
    private FacturaDAO facturaRepository;

    @Mock
    private OcupacionDAO ocupacionRepository;

    @InjectMocks
    private FacturaService service;

    @Test
    void cargarFactura_conResponsableFisica_ok() {
        FacturaRequest req = new FacturaRequest();
        req.setMonto(1500f);
        req.setTipoResponsable("FISICA");
        req.setIdResponsable(10L);
        req.setIdOcupacion(20L);

        PersonaFisica pf = new PersonaFisica();
        pf.setIdResponsable(10L);

        Ocupacion ocup = new Ocupacion();
        ocup.setIdOcupacion(20L);

        when(pfRepository.findById(10L)).thenReturn(Optional.of(pf));
        when(ocupacionRepository.findById(20L)).thenReturn(Optional.of(ocup));
        when(facturaRepository.save(any())).thenAnswer(inv -> {
            Factura f = inv.getArgument(0);
            f.setNumeroFactura(99L);
            return f;
        });

        ResponseEntity<Long> resp = service.cargarFactura(req);

        assertEquals(99L, resp.getBody());
        verify(pfRepository).findById(10L);
        verify(facturaRepository).save(any(Factura.class));
    }

    @Test
    void cargarFactura_conResponsableJuridica_ok() {
        FacturaRequest req = new FacturaRequest();
        req.setMonto(1500f);
        req.setTipoResponsable("JURIDICA");
        req.setIdResponsable(11L);
        req.setIdOcupacion(20L);

        PersonaJuridica pj = new PersonaJuridica();
        pj.setIdResponsable(11L);

        Ocupacion ocup = new Ocupacion();
        ocup.setIdOcupacion(20L);

        when(pjRepository.findById(11L)).thenReturn(Optional.of(pj));
        when(ocupacionRepository.findById(20L)).thenReturn(Optional.of(ocup));
        when(facturaRepository.save(any())).thenAnswer(inv -> {
            Factura f = inv.getArgument(0);
            f.setNumeroFactura(50L);
            return f;
        });

        ResponseEntity<Long> resp = service.cargarFactura(req);

        assertEquals(50L, resp.getBody());
        verify(pjRepository).findById(11L);
        verify(facturaRepository).save(any(Factura.class));
    }

    @Test
    void cargarFactura_responsableNoExiste_throw() {
        FacturaRequest req = new FacturaRequest();
        req.setTipoResponsable("FISICA");
        req.setIdResponsable(10L);
        req.setIdOcupacion(20L);

        when(pfRepository.findById(10L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> service.cargarFactura(req));
    }

    @Test
    void cargarFactura_ocupacionNoExiste_throw() {
        FacturaRequest req = new FacturaRequest();
        req.setTipoResponsable("FISICA");
        req.setIdResponsable(10L);
        req.setIdOcupacion(20L);

        when(pfRepository.findById(10L)).thenReturn(Optional.of(new PersonaFisica()));
        when(ocupacionRepository.findById(20L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> service.cargarFactura(req));
    }
}
