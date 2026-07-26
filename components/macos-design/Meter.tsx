export function Meter({ value }: { value: number }) {
  return <div className="meter" aria-label={`${value} out of 10 confidence`}><span style={{ width: `${value * 10}%` }} /></div>;
}
