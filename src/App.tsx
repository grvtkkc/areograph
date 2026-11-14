
import { useState } from "react";
import "./App.css";

type Layer = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  color: string;
};

const initialLayers: Layer[] = [
  {
    id: "mola",
    name: "MOLA Elevation",
    description: "Global topography",
    enabled: true,
    color: "#d98b58",
  },
  {
    id: "viking",
    name: "Viking MDIM",
    description: "Global imagery",
    enabled: false,
    color: "#b8a18b",
  },
  {
    id: "themis",
    name: "THEMIS",
    description: "Thermal imagery",
    enabled: false,
    color: "#d4b45e",
  },
  {
    id: "geology",
    name: "Geological Map",
    description: "Surface composition",
    enabled: false,
    color: "#83a99a",
  },
  {
    id: "ctx",
    name: "CTX Mosaic",
    description: "High-resolution imagery",
    enabled: false,
    color: "#8c9dbd",
  },
];

function App() {
  const [layers, setLayers] = useState(initialLayers);
  const [zoom, setZoom] = useState(1);
  const [activePanel, setActivePanel] = useState("layers");
  const [activeTool, setActiveTool] = useState("pan");
  const [search, setSearch] = useState("");

  const toggleLayer = (id: string) => {
    setLayers((current) =>
      current.map((layer) =>
        layer.id === id
          ? { ...layer, enabled: !layer.enabled }
          : layer
      )
    );
  };

  const enabledCount = layers.filter((layer) => layer.enabled).length;

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">A</div>
          <div>
            <div className="brand-name">AREOGRAPH</div>
            <div className="brand-subtitle">PLANETARY EXPLORATION SYSTEM</div>
          </div>
        </div>

        <div className="topbar-center">
          <span className="planet-indicator" />
          <span>MARS</span>
          <span className="topbar-divider">/</span>
          <span className="muted">GLOBAL VIEW</span>
        </div>

        <div className="topbar-right">
          <span className="connection-status">
            <span className="status-dot" />
            LOCAL BUILD
          </span>
          <button className="avatar" title="Local developer">G</button>
        </div>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <div className="sidebar-tabs">
            <button
              className={activePanel === "layers" ? "tab active" : "tab"}
              onClick={() => setActivePanel("layers")}
            >
              <span>▤</span> Layers
            </button>
            <button
              className={activePanel === "explore" ? "tab active" : "tab"}
              onClick={() => setActivePanel("explore")}
            >
              <span>⌖</span> Explore
            </button>
          </div>

          {activePanel === "layers" ? (
            <div className="sidebar-content">
              <div className="section-heading">
                <div>
                  <div className="section-title">MAP LAYERS</div>
                  <div className="section-subtitle">
                    {enabledCount} active layers
                  </div>
                </div>
                <span className="section-icon">▧</span>
              </div>

              <div className="layer-list">
                {layers.map((layer) => (
                  <label className="layer-item" key={layer.id}>
                    <span
                      className="layer-color"
                      style={{ background: layer.color }}
                    />
                    <span className="layer-info">
                      <span className="layer-name">{layer.name}</span>
                      <span className="layer-description">
                        {layer.description}
                      </span>
                    </span>
                    <input
                      type="checkbox"
                      checked={layer.enabled}
                      onChange={() => toggleLayer(layer.id)}
                      aria-label={`Toggle ${layer.name}`}
                    />
                  </label>
                ))}
              </div>

              <div className="sidebar-divider" />

              <div className="section-heading">
                <div>
                  <div className="section-title">DATA SOURCES</div>
                  <div className="section-subtitle">Mission archives</div>
                </div>
              </div>

              <div className="source-card">
                <span className="source-symbol">N</span>
                <div>
                  <div className="source-name">NASA / PDS</div>
                  <div className="source-description">Planetary Data System</div>
                </div>
                <span className="source-arrow">↗</span>
              </div>

              <div className="source-card">
                <span className="source-symbol">U</span>
                <div>
                  <div className="source-name">USGS Astrogeology</div>
                  <div className="source-description">Planetary cartography</div>
                </div>
                <span className="source-arrow">↗</span>
              </div>
            </div>
          ) : (
            <div className="sidebar-content">
              <div className="section-title">EXPLORATION</div>
              <div className="explore-card">
                <div className="explore-number">01</div>
                <div>
                  <div className="layer-name">Valles Marineris</div>
                  <div className="layer-description">
                    Canyon system · Regional focus
                  </div>
                </div>
              </div>
              <div className="explore-note">
                Regional locations and feature search will be available in a
                future release.
              </div>
            </div>
          )}

          <div className="sidebar-footer">
            <span className="footer-dot" />
            AREOGRAPH DEVELOPMENT BUILD
            <span className="version">0.1.0</span>
          </div>
        </aside>

        <section className="map-workspace">
          <div className="map-toolbar">
            <div className="breadcrumb">
              <span>PLANETS</span>
              <span className="breadcrumb-separator">/</span>
              <strong>MARS</strong>
              <span className="breadcrumb-separator">/</span>
              <span className="muted">GLOBAL</span>
            </div>

            <div className="toolbar-actions">
              <button
                className={activeTool === "pan" ? "tool-button selected" : "tool-button"}
                onClick={() => setActiveTool("pan")}
                title="Pan tool"
              >
                ✥ <span>Pan</span>
              </button>
              <button
                className={activeTool === "measure" ? "tool-button selected" : "tool-button"}
                onClick={() => setActiveTool("measure")}
                title="Measurement tool preview"
              >
                ⟷ <span>Measure</span>
              </button>
              <button
                className={activeTool === "identify" ? "tool-button selected" : "tool-button"}
                onClick={() => setActiveTool("identify")}
                title="Identify tool preview"
              >
                ⊙ <span>Identify</span>
              </button>
            </div>
          </div>

          <div className="map-canvas">
            <div className="map-grid" />
            <div className="map-glow" />

            <div className="map-preview">
              <div className="mars-orbit orbit-one" />
              <div className="mars-orbit orbit-two" />
              <div className="mars-planet">
                <div className="planet-texture" />
              </div>
              <div className="planet-label">MARS</div>
              <div className="preview-caption">
                PLANETARY DATA AWAITING CONNECTION
              </div>
            </div>

            <div className="map-label map-label-top">
              <span className="tiny-dot" />
              GLOBAL EXPLORER
            </div>

            <div className="map-label map-label-bottom">
              <span>MAP DATA</span>
              <strong>NOT LOADED</strong>
            </div>

            <div className="zoom-controls">
              <button
                onClick={() => setZoom((z) => Math.min(5, z + 0.25))}
                title="Zoom in"
              >
                +
              </button>
              <div className="zoom-value">{zoom.toFixed(2)}×</div>
              <button
                onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
                title="Zoom out"
              >
                −
              </button>
              <button onClick={() => setZoom(1)} title="Reset zoom">
                ⌂
              </button>
            </div>

            <div className="map-search">
              <span>⌕</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search planetary features..."
                aria-label="Search planetary features"
              />
              <kbd>⌘ K</kbd>
            </div>

            <div className="map-notice">
              <span>i</span>
              <span>
                Interface preview · Geographic imagery integration is next
              </span>
            </div>
          </div>

          <footer className="statusbar">
            <div className="status-left">
              <span className="status-dot" />
              <span>APPLICATION ONLINE</span>
              <span className="status-separator">|</span>
              <span>MAP ENGINE PENDING</span>
            </div>
            <div className="status-right">
              <span>PROJECTION: UNCONFIGURED</span>
              <span className="status-separator">|</span>
              <span>ZOOM {zoom.toFixed(2)}×</span>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}

export default App;
