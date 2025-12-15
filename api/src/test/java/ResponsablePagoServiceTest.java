
import com.DESO_TP.DESO_backend.DataAccessObject.HuespedDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.PersonaFisicaDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.PersonaJuridicaDAO;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.PersonaJuridicaResponse;
import com.DESO_TP.DESO_backend.Services.ResponsablePagoService;
import com.DESO_TP.EntidadesDominio.Huesped;
import com.DESO_TP.EntidadesDominio.IDs.HuespedId;
import com.DESO_TP.EntidadesDominio.PersonaFisica;
import com.DESO_TP.EntidadesDominio.PersonaJuridica;
import com.DESO_TP.Enumerados.TipoDocumento;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author jauni
 */
@ExtendWith(MockitoExtension.class)
class ResponsablePagoServiceTest {

    @InjectMocks
    private ResponsablePagoService service;

    @Mock
    private PersonaJuridicaDAO personaJuridicaRepository;

    @Mock
    private PersonaFisicaDAO personaFisicaRepository;

    @Mock
    private HuespedDAO huespedRepository;

    @Test
    void buscarResponsablePorCUIT_existente_devuelveResponse() {
        String cuit = "30-12345678-9";
        PersonaJuridica pj = new PersonaJuridica();
        pj.setCuit(cuit);

        when(personaJuridicaRepository.findByCuit(cuit))
                .thenReturn(Optional.of(pj));

        PersonaJuridicaResponse response =
                service.buscarResponsablePorCUIT(cuit);

        assertNotNull(response);
        verify(personaJuridicaRepository).findByCuit(cuit);
    }

    @Test
    void buscarResponsablePorCUIT_inexistente_devuelveNull() {
        String cuit = "30-00000000-0";

        when(personaJuridicaRepository.findByCuit(cuit))
                .thenReturn(Optional.empty());

        PersonaJuridicaResponse response =
                service.buscarResponsablePorCUIT(cuit);

        assertNull(response);
    }

    @Test
    void cargarHuespedComoResponsable_personaFisicaExistente_devuelveId() {
        TipoDocumento tipo = TipoDocumento.DNI;
        String nro = "12345678";

        Huesped h = new Huesped();
        PersonaFisica pf = new PersonaFisica();
        pf.setIdResponsable(10L);

        when(huespedRepository.findById(new HuespedId(tipo, nro)))
                .thenReturn(Optional.of(h));

        when(personaFisicaRepository
                .findByHuesped_TipoDocumentoAndHuesped_NumeroDocumento(tipo, nro))
                .thenReturn(Optional.of(pf));

        ResponseEntity<Long> response =
                service.cargarHuespedComoResponsable(tipo, nro);

        assertEquals(10L, response.getBody());
        verify(personaFisicaRepository, never()).save(any());
    }

    @Test
    void cargarHuespedComoResponsable_noExistePersonaFisica_laCrea() {
        TipoDocumento tipo = TipoDocumento.DNI;
        String nro = "12345678";

        Huesped h = new Huesped();

        when(huespedRepository.findById(new HuespedId(tipo, nro)))
                .thenReturn(Optional.of(h));

        when(personaFisicaRepository
                .findByHuesped_TipoDocumentoAndHuesped_NumeroDocumento(tipo, nro))
                .thenReturn(Optional.empty());

        when(personaFisicaRepository.save(any(PersonaFisica.class)))
                .thenAnswer(inv -> {
                    PersonaFisica pf = inv.getArgument(0);
                    pf.setIdResponsable(20L);
                    return pf;
                });

        ResponseEntity<Long> response =
                service.cargarHuespedComoResponsable(tipo, nro);

        assertEquals(20L, response.getBody());
        verify(personaFisicaRepository).save(any(PersonaFisica.class));
    }


    @Test
    void darDeBaja_existente_eliminaCorrectamente() {
        String cuit = "30-12345678-9";

        when(personaJuridicaRepository.existsByCuit(cuit))
                .thenReturn(true);

        ResponseEntity<String> response = service.darDeBaja(cuit);

        verify(personaJuridicaRepository).deleteByCuit(cuit);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void darDeBaja_inexistente_lanzaExcepcion() {
        String cuit = "30-00000000-0";

        when(personaJuridicaRepository.existsByCuit(cuit))
                .thenReturn(false);

        assertThrows(RuntimeException.class,
                () -> service.darDeBaja(cuit));

        verify(personaJuridicaRepository, never())
                .deleteByCuit(any());
    }
}
