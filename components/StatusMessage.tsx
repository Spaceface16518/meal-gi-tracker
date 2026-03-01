export function StatusMessage({ status, error }: { status?: string; error?: string }) {
  if (!status && !error) return null;

  return (
    <div className="status-wrap">
      {status ? <p className="status-ok">{status}</p> : null}
      {error ? <p className="status-error">{error}</p> : null}
    </div>
  );
}
