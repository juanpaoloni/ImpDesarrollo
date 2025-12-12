/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
import com.DESO_TP.DESO_backend.DataAccessObject.HabitacionDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.ReservaDAO;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.ReservaResponse;
import com.DESO_TP.DESO_backend.Services.ReservaService;
import com.DESO_TP.EntidadesDominio.Habitacion;
import com.DESO_TP.EntidadesDominio.Reserva;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import java.util.List;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.Mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

/**
 *
 * @author julia
 */

@ExtendWith(MockitoExtension.class)
public class ReservaServiceTest {
    private ReservaDAO reservaRepository;
    private HabitacionDAO habitacionDAO;

    private ReservaService reservaService;

    @BeforeEach
    void setUp() {
        reservaRepository = mock(ReservaDAO.class);
        habitacionDAO = mock(HabitacionDAO.class);

        reservaService = new ReservaService();

        try {
            var fieldReservaRepo = ReservaService.class.getDeclaredField("reservaRepository");
            fieldReservaRepo.setAccessible(true);
            fieldReservaRepo.set(reservaService, reservaRepository);

            var fieldHabDAO = ReservaService.class.getDeclaredField("habitacionDAO");
            fieldHabDAO.setAccessible(true);
            fieldHabDAO.set(reservaService, habitacionDAO);
        } catch (Exception e) {
            throw new RuntimeException("No se pudo inyectar dependencias", e);
        }
    }

    //obtenerReservaPorNumeroHabitacion
    @Test
    void obtenerReservaPorNumeroHabitacion_retornaListaVacia_cuandoNoHayReservas() {
        when(reservaRepository.findByHabitacion_NumeroHabitacion(10))
                .thenReturn(Collections.emptyList());

        List<ReservaResponse> resultado = reservaService.obtenerReservaPorNumeroHabitacion(10);

        assertNotNull(resultado);
        assertTrue(resultado.isEmpty());
    }

    @Test
    void obtenerReservaPorNumeroHabitacion_mapeaCorrectamenteReservasAResponse() {
        Habitacion h = new Habitacion();
        h.setNumeroHabitacion(5);

        Reserva reserva = new Reserva();
        reserva.setHabitacion(h);

        when(reservaRepository.findByHabitacion_NumeroHabitacion(5))
                .thenReturn(List.of(reserva));

        List<ReservaResponse> resultado = reservaService.obtenerReservaPorNumeroHabitacion(5);

        assertEquals(1, resultado.size());
        assertEquals(5, resultado.get(0).getNumeroHabitacion());
    }


    //crearMultiplesReservas
    @Test
    void crearMultiplesReservas_lanzaExcepcion_siHabitacionNoExiste() {
        Habitacion h = new Habitacion();
        h.setNumeroHabitacion(50);

        Reserva r = new Reserva();
        r.setHabitacion(h);

        when(habitacionDAO.findById(50)).thenReturn(Optional.empty());

        List<Reserva> reservas = List.of(r);

        assertThrows(RuntimeException.class,
                () -> reservaService.crearMultiplesReservas(reservas),
                "Habitación no encontrada");
    }

    @Test
    void crearMultiplesReservas_guardaReservasCorrectamente() {
        Habitacion h = new Habitacion();
        h.setNumeroHabitacion(20);

        Reserva r = new Reserva();
        r.setHabitacion(h);

        when(habitacionDAO.findById(20)).thenReturn(Optional.of(h));

        List<Reserva> reservas = List.of(r);

        reservaService.crearMultiplesReservas(reservas);

        // Verifica que se llamó a save
        verify(reservaRepository, times(1)).save(r);

        // Verifica que la habitación fue reemplazada
        assertEquals(h, r.getHabitacion());
    }
}

