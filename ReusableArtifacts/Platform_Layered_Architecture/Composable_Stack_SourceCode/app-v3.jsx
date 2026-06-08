const TWEAK_DEFAULTS_V3 = /*EDITMODE-BEGIN*/{
  "layerStyle": "transparent",
  "palette": "pmg",
  "isoX": 58,
  "gap": 126,
  "tile": 280,
  "thick": 14
}/*EDITMODE-END*/;

function AppV3() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS_V3);

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--iso-x', t.isoX + 'deg');
    root.style.setProperty('--gap', t.gap + 'px');
    root.style.setProperty('--tile', t.tile + 'px');
    root.style.setProperty('--thick', t.thick + 'px');
    const slide = document.querySelector('.slide');
    if (!slide) return;
    slide.setAttribute('data-palette', t.palette);
    slide.setAttribute('data-layerstyle', t.layerStyle);
  }, [t.isoX, t.gap, t.tile, t.thick, t.palette, t.layerStyle]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Layer Style" />
      <TweakRadio
        label="Surface"
        value={t.layerStyle}
        options={[
          { value: 'transparent', label: 'Transparent' },
          { value: 'colored', label: 'Colored' },
        ]}
        onChange={(v) => setTweak('layerStyle', v)}
      />

      <TweakSection label="Color" />
      <TweakSelect
        label="Palette"
        value={t.palette}
        options={[
          { value: 'pmg',      label: 'PMG (brand)' },
          { value: 'spectrum', label: 'Spectrum' },
          { value: 'cool',     label: 'Cool' },
          { value: 'warm',     label: 'Warm' },
        ]}
        onChange={(v) => setTweak('palette', v)}
      />

      <TweakSection label="Geometry" />
      <TweakSlider label="Iso angle"      value={t.isoX}  min={40} max={72} step={1}  unit="°"  onChange={(v) => setTweak('isoX', v)} />
      <TweakSlider label="Layer spacing"  value={t.gap}   min={90} max={200} step={2} unit="px" onChange={(v) => setTweak('gap', v)} />
      <TweakSlider label="Tile size"      value={t.tile}  min={200} max={360} step={4} unit="px" onChange={(v) => setTweak('tile', v)} />
      <TweakSlider label="Thickness"      value={t.thick} min={4}  max={36}  step={1}  unit="px" onChange={(v) => setTweak('thick', v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('tweaks-root')).render(<AppV3 />);
