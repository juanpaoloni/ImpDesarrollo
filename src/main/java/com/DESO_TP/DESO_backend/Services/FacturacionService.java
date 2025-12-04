package com.DESO_TP.DESO_backend.Services;

import com.DESO_TP.DESO_backend.DataAccessObject.DireccionDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.HuespedDAO;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.HuespedResponse; 
import com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities.FacturaRequest;
import com.DESO_TP.Enumerados.TipoDocumento;  

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FacturacionService {

    private final HuespedDAO huespedRepository;
    private final DireccionDAO direccionRepository;

    public HuespedResponse crearHuesped(HuespedRequest req) {

        // Construir la dirección a partir del request
        DireccionRequest dreq = req.getDireccion();
        Direccion d = new Direccion();

        d.setCalle(dreq.getCalle());
        d.setNumero(dreq.getNumero());
        d.setDepartamento(dreq.getDepartamento());
        d.setPiso(dreq.getPiso());
        d.setCodigoPostal(dreq.getCodigoPostal());
        d.setLocalidad(dreq.getLocalidad());
        d.setProvincia(dreq.getProvincia());
        d.setPais(dreq.getPais());

        // Guardar la dirección primero
        direccionRepository.save(d);

        // Crear entidad huésped
        Huesped h = new Huesped();
        h.setTipoDocumento(req.getTipoDocumento());
        h.setNumeroDocumento(req.getNumeroDocumento());
        h.setNombre(req.getNombre());
        h.setApellido(req.getApellido());
        h.setCUIT(req.getCUIT());
        h.setPosicionIVA(req.getPosicionIVA());
        h.setFechaNacimiento(req.getFechaNacimiento());
        h.setNacionalidad(req.getNacionalidad());
        h.setEmail(req.getEmail());
        h.setTelefono(req.getTelefono());
        h.setOcupacion(req.getOcupacion());
        h.setDireccion(d);

        huespedRepository.save(h);

        return toResponse(h);
    }

    public HuespedResponse obtenerHuesped(TipoDocumento tipo, String numero) {

        HuespedId id = new HuespedId(tipo, numero);

        Huesped h = huespedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Huesped no encontrado"));

        return toResponse(h);
    }


    public HuespedResponse actualizarHuesped(HuespedRequest req) {

        HuespedId id = new HuespedId(req.getTipoDocumento(), req.getNumeroDocumento());

        Huesped h = huespedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Huesped no encontrado"));

        // Actualizar datos
        h.setNombre(req.getNombre());
        h.setApellido(req.getApellido());
        h.setCUIT(req.getCUIT());
        h.setPosicionIVA(req.getPosicionIVA());
        h.setFechaNacimiento(req.getFechaNacimiento());
        h.setNacionalidad(req.getNacionalidad());
        h.setEmail(req.getEmail());
        h.setTelefono(req.getTelefono());
        h.setOcupacion(req.getOcupacion());

        // Actualizar dirección
        if (req.getDireccion() != null) {
            DireccionRequest dreq = req.getDireccion();
            Direccion d = h.getDireccion();

            d.setCalle(dreq.getCalle());
            d.setNumero(dreq.getNumero());
            d.setDepartamento(dreq.getDepartamento());
            d.setPiso(dreq.getPiso());
            d.setCodigoPostal(dreq.getCodigoPostal());
            d.setLocalidad(dreq.getLocalidad());
            d.setProvincia(dreq.getProvincia());
            d.setPais(dreq.getPais());

            direccionRepository.save(d);
        }

        huespedRepository.save(h);

        return toResponse(h);
    }

    public void eliminarHuesped(TipoDocumento tipo, String numero) {

        HuespedId id = new HuespedId(tipo, numero);

        if (!huespedRepository.existsById(id)) {
            throw new RuntimeException("Huesped no encontrado");
        }

        huespedRepository.deleteById(id);
    }

    private HuespedResponse toResponse(Huesped h) {

        Direccion d = h.getDireccion();

        DireccionResponse direccionDTO = new DireccionResponse(
                d.getIdDireccion(),
                d.getCalle(),
                d.getNumero(),
                d.getDepartamento(),
                d.getPiso(),
                d.getCodigoPostal(),
                d.getLocalidad(),
                d.getProvincia(),
                d.getPais()
        );

        return new HuespedResponse(
                h.getTipoDocumento(),
                h.getNumeroDocumento(),
                h.getNombre(),
                h.getApellido(),
                h.getCUIT(),
                h.getPosicionIVA(),
                h.getFechaNacimiento(),
                h.getNacionalidad(),
                h.getEmail(),
                h.getTelefono(),
                h.getOcupacion(),
                direccionDTO
        );
    }

}