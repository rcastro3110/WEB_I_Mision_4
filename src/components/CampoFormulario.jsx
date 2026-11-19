export default function CampoFormulario({
  id,
  label,
  error,
  as: Control = "input",
  children,
  ...props
}) {
  const errorId = `${id}-error`;
  const esCheckbox = props.type === "checkbox";

  const control = (
    <Control
      id={id}
      aria-invalid={!!error}
      aria-describedby={error ? errorId : undefined}
      {...props}
    >
      {children}
    </Control>
  );

  return (
    <div className="campo">
      {esCheckbox ? (
        <label htmlFor={id}>
          {control} {label}
        </label>
      ) : (
        <>
          <label htmlFor={id}>{label}</label>
          {control}
        </>
      )}
      {error && (
        <p id={errorId} role="alert" className="error">
          {error.message}
        </p>
      )}
    </div>
  );
}