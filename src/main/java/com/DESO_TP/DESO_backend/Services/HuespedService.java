/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.DESO_TP.DESO_backend.Services;

/**
 *
 * @author jauni
 */
import Enumerados.TipoDocumento;
import com.DESO_TP.DESO_backend.DataAccessObject.DireccionDAO;
import com.DESO_TP.DESO_backend.DataAccessObject.HuespedDAO;
import com.DESO_TP.DESO_backend.DataTransferObjects.RequestEntities.HuespedRequest;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.DireccionResponse;
import com.DESO_TP.DESO_backend.DataTransferObjects.ResponseEntities.HuespedResponse;
import com.DESO_TP.EntidadesDominio.Direccion;
import com.DESO_TP.EntidadesDominio.Huesped;
import com.DESO_TP.EntidadesDominio.IDs.HuespedId;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HuespedService {

    private final HuespedDAO huespedRepository;
    private final DireccionDAO direccionRepository;

    public HuespedResponse crearHuesped(HuespedRequest req) {

        // Buscar la dirección que se mandó (por ID)
        Direccion direccion = direccionRepository.findById(req.getDireccionId())
                .orElseThrow(() -> new RuntimeException("Dirección no encontrada"));

        // Crear entidad
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
        h.setDireccion(direccion);

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

        // Actualizar campos
        h.setNombre(req.getNombre());
        h.setApellido(req.getApellido());
        h.setCUIT(req.getCUIT());
        h.setPosicionIVA(req.getPosicionIVA());
        h.setFechaNacimiento(req.getFechaNacimiento());
        h.setNacionalidad(req.getNacionalidad());
        h.setEmail(req.getEmail());
        h.setTelefono(req.getTelefono());
        h.setOcupacion(req.getOcupacion());

        // Actualizar dirección si se envió otra
        if (req.getDireccionId() != null) {
            Direccion direccion = direccionRepository.findById(req.getDireccionId())
                    .orElseThrow(() -> new RuntimeException("Dirección no encontrada"));
            h.setDireccion(direccion);
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
