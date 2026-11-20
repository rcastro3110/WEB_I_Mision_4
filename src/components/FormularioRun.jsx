import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { runSchema, aSegundos } from "../schemas/runSchema.js";
import { PLATAFORMAS, categoriasDe } from "../data/juegos.js";
import CampoFormulario from "./CampoFormulario.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { crearRun, mensajeDeError } from "../services/runs.js";


export default function FormularioRun({ juego }) {
    const [categoria, setCategoria] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(runSchema),
        defaultValues: {
        nombre: "",
        juego,
        categoria: "",
        plataforma: "",
        version: "",
        horas: 0,
        minutos: 0,
        segundos: 0,
        fecha: "",
        video: "",
        normas: false,
        },
    });

    const queryClient = useQueryClient();

    const mutacion = useMutation({
        mutationFn: crearRun,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["runs", juego] });
            reset();
            setCategoria("");
        },
    });

    const categorias = categoriasDe(juego);
    const descripcion = categorias.find((c) => c.nombre === categoria)?.descripcion;

    // Registramos nombre ANTES que categoria para que sea el primero en el orden de foco
    const registroNombre = register("nombre");
    const registroCategoria = register("categoria");

    function onSubmit(datos) {
        const run = {
            nombre: datos.nombre,
            juego: datos.juego,
            categoria: datos.categoria,
            plataforma: datos.plataforma,
            version: datos.version,
            tiempo: aSegundos(datos),
            fecha: datos.fecha,
            video: datos.video,
            normas: datos.normas,
        };
        mutacion.mutate(run);
    }
  
    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h2>Submit a run for {juego}</h2>

            {/* El juego no se elige aquí: viene de App. Este campo oculto hace que viaje con los datos */}
            <input type="hidden" {...register("juego")} />

            <CampoFormulario
                id="nombre"
                label="Runner name"
                error={errors.nombre}
                autoComplete="nickname"
                {...registroNombre}
            />

            <CampoFormulario
                id="categoria"
                label="Category"
                as="select"
                error={errors.categoria}
                {...registroCategoria}
                onChange={(e) => {
                registroCategoria.onChange(e);
                setCategoria(e.target.value);
                }}
            >
                <option value="">Pick a category</option>
                {categorias.map((c) => (
                <option key={c.nombre} value={c.nombre}>
                    {c.nombre}
                </option>
                ))}
            </CampoFormulario>
            {descripcion && <p className="ayuda">{descripcion}</p>}

            <CampoFormulario
                id="plataforma"
                label="Platform"
                as="select"
                error={errors.plataforma}
                {...register("plataforma")}
            >
                <option value="">Pick a platform</option>
                {PLATAFORMAS.map((p) => (
                <option key={p} value={p}>
                    {p}
                </option>
                ))}
            </CampoFormulario>

            <CampoFormulario
                id="version"
                label="Game version"
                placeholder="1.0 or 1.0.0"
                error={errors.version}
                {...register("version")}
            />

            <fieldset>
                <legend>Time</legend>
                <CampoFormulario
                id="horas"
                label="Hours"
                type="number"
                min="0"
                error={errors.horas}
                {...register("horas")}
                />
                <CampoFormulario
                id="minutos"
                label="Minutes"
                type="number"
                min="0"
                max="59"
                error={errors.minutos}
                {...register("minutos")}
                />
                <CampoFormulario
                id="segundos"
                label="Seconds"
                type="number"
                min="0"
                max="59"
                error={errors.segundos}
                {...register("segundos")}
                />
            </fieldset>

            <CampoFormulario
                id="fecha"
                label="Date of the run"
                type="date"
                error={errors.fecha}
                {...register("fecha")}
            />

            <CampoFormulario
                id="video"
                label="Video proof (optional)"
                type="url"
                placeholder="https://..."
                error={errors.video}
                {...register("video")}
            />

            <CampoFormulario
                id="normas"
                label="I accept the rules"
                type="checkbox"
                error={errors.normas}
                {...register("normas")}
            />

            <button type="submit" disabled={mutacion.isPending}>
                {mutacion.isPending ? "Sending…" : "Submit run"}
            </button>
            {mutacion.isSuccess && <p role="status">Run submitted!</p>}
            {mutacion.isError && <p role="alert">{mensajeDeError(mutacion.error)}</p>}
        </form>
    );
}