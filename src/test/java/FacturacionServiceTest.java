/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

import com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities.FacturaRequest;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.OcupacionResponse;
import com.DESO_TP.DESO_backend.Services.FacturacionService;
import com.DESO_TP.DESO_backend.Services.OcupacionService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
/**
 *
 * @author julia
 */
@ExtendWith(MockitoExtension.class)
public class FacturacionServiceTest {
    @Mock
    private OcupacionService ocupacionService;

    @InjectMocks
    private FacturacionService facturacionService;

    //Entrada valida
    @Test
    void buscarOcupacionesParaFacturar_ok() { 
        //Que debe devolver el servicio mock
        FacturaRequest req = mock(FacturaRequest.class);
        when(req.getNumeroDeHabitacion()).thenReturn(1); //La habitacion 1 esta ocupada
        
        List<OcupacionResponse> mockList = List.of(new OcupacionResponse());
        when(ocupacionService.obtenerOcupacionPorNumeroHabitacion(1))
                .thenReturn(mockList);

        //Llamada del metodo real con mock
        List<OcupacionResponse> result = facturacionService.buscarOcupacionesParaFacturar(req);

        //Verificacion del resultado
        assertEquals(1, result.size());
        verify(ocupacionService).obtenerOcupacionPorNumeroHabitacion(1);
    }

    //Entrada Invalida
    @Test
    void buscarOcupacionesParaFacturar_numeroInvalido_lanzaExcepcion() { 
        FacturaRequest req = mock(FacturaRequest.class);
        when(req.getNumeroDeHabitacion()).thenThrow(NumberFormatException.class);

        assertThrows(IllegalArgumentException.class,
            () -> facturacionService.buscarOcupacionesParaFacturar(req));
    }

    //Entrada Vacia
    @Test
    void buscarOcupacionesParaFacturar_listaVacia_lanzaRuntimeException() {
        FacturaRequest req = mock(FacturaRequest.class);
        when(req.getNumeroDeHabitacion()).thenReturn(1); //La habitacion 1 no fue ocupada

        when(ocupacionService.obtenerOcupacionPorNumeroHabitacion(1))
            .thenReturn(Collections.emptyList());

        assertThrows(RuntimeException.class,
            () -> facturacionService.buscarOcupacionesParaFacturar(req));
    }
}
    