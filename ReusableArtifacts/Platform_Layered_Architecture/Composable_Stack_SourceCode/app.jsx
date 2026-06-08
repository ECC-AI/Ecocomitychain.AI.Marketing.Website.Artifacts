const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "spectrum",
  "isoX": 58,
  "gap": 126,
  "tile": 280,
  "thick": 14
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--iso-x', t.isoX + 'deg');
    root.style.setProperty('--gap', t.gap + 'px');
    root.style.setProperty('--tile', t.tile + 'px');
    root.style.setProperty('--thick', t.thick + 'px');
    const slide = document.querySelector('.slide');
    if (slide) slide.setAttribute('data-palette', t.palette);
  }, [t.isoX, t.gap, t.tile, t.thick, t.palette]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Color" />
      <TweakSelect label="Palette" value={t.palette}
        options={[
          { value: 'spectrum', label: 'Spectrum' },
          { value: 'warm', label: 'Warm' },
          { value: 'cool', label: 'Cool' },
          { value: 'violet', label: 'Violet' },
        ]}
        onChange={(v) => setTweak('palette', v)} />

      <TweakSection label="Geometry" />
      <TweakSlider label="Iso angle" value={t.isoX} min={40} max={72} step={1} unit="°"
        onChange={(v) => setTweak('isoX', v)} />
      <TweakSlider label="Layer spacing" value={t.gap} min={100} max={210} step={2} unit="px"
        onChange={(v) => setTweak('gap', v)} />
      <TweakSlider label="Tile size" value={t.tile} min={220} max={360} step={4} unit="px"
        onChange={(v) => setTweak('tile', v)} />
      <TweakSlider label="Thickness" value={t.thick} min={6} max={36} step={1} unit="px"
        onChange={(v) => setTweak('thick', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<App />);
