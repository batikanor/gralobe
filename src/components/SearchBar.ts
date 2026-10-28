/**
 * SearchBar Component
 *
 * A small text input (top-left) letting the user type a country name and
 * jump the globe straight to it, instead of dragging to find it manually.
 */

export interface SearchableCountry {
  id: string;
  name: string;
}

let nextSearchId = 0;

// Inject global styles once
let stylesInjected = false;

function injectGlobalStyles(): void {
  if (stylesInjected) return;
  stylesInjected = true;

  const style = document.createElement("style");
  style.setAttribute("data-gralobe-search", "true");
  style.textContent = `
    .gralobe-search {
      position: absolute;
      top: 12px;
      left: 12px;
      z-index: 850;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      width: 190px;
      max-width: calc(100% - 24px);
    }

    .gralobe-search-input {
      width: 100%;
      box-sizing: border-box;
      background: rgba(0, 10, 20, 0.85);
      border: 1px solid rgba(100, 150, 200, 0.3);
      border-radius: 6px;
      color: #ddd;
      font-size: 12px;
      font-family: inherit;
      padding: 7px 10px;
      outline: none;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
    }

    .gralobe-search-input:focus {
      border-color: rgba(100, 180, 255, 0.6);
    }

    .gralobe-search-input::placeholder {
      color: #667;
    }

    .gralobe-search-suggestions {
      margin-top: 4px;
      background: rgba(0, 10, 20, 0.94);
      border: 1px solid rgba(100, 150, 200, 0.3);
      border-radius: 6px;
      overflow: hidden;
      display: none;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    }

    .gralobe-search-suggestions.visible {
      display: block;
    }

    .gralobe-search-item {
      padding: 6px 10px;
      font-size: 12px;
      color: #ccc;
      cursor: pointer;
    }

    .gralobe-search-item:hover,
    .gralobe-search-item.active {
      background: rgba(100, 150, 200, 0.15);
      color: #fff;
    }
  `;
  document.head.appendChild(style);
}

export class SearchBar {
  private element: HTMLElement;
  private input: HTMLInputElement;
  private suggestionsEl: HTMLElement;
  private countries: SearchableCountry[] = [];
  private matches: SearchableCountry[] = [];
  private activeIndex = -1;
  private onSelect: (featureId: string) => void;
  private blurTimeout: ReturnType<typeof setTimeout> | undefined;

  constructor(parentContainer: HTMLElement, onSelect: (featureId: string) => void) {
    injectGlobalStyles();
    this.onSelect = onSelect;

    const parentPosition = getComputedStyle(parentContainer).position;
    if (parentPosition === "static") {
      parentContainer.style.position = "relative";
    }

    this.element = document.createElement("div");
    this.element.className = "gralobe-search";
    this.element.innerHTML = `
      <input class="gralobe-search-input" type="text" placeholder="Search country…" aria-label="Search country" role="combobox" aria-autocomplete="list" aria-expanded="false" autocomplete="off" />
      <div class="gralobe-search-suggestions" role="listbox" aria-label="Countries"></div>
    `;

    this.input = this.element.querySelector(".gralobe-search-input") as HTMLInputElement;
    this.suggestionsEl = this.element.querySelector(".gralobe-search-suggestions") as HTMLElement;
    this.suggestionsEl.id = `gralobe-search-${nextSearchId++}`;
    this.input.setAttribute("aria-controls", this.suggestionsEl.id);

    this.input.addEventListener("input", () => this.updateSuggestions());
    this.input.addEventListener("keydown", (e) => this.handleKeydown(e));
    this.input.addEventListener("blur", () => {
      // Delay so a click on a suggestion still registers before we hide it
      this.blurTimeout = setTimeout(() => this.hideSuggestions(), 150);
    });
    this.input.addEventListener("focus", () => {
      clearTimeout(this.blurTimeout);
      this.updateSuggestions();
    });

    parentContainer.appendChild(this.element);
  }

  /** The full set of countries this search box can jump to. */
  setCountries(countries: SearchableCountry[]): void {
    this.countries = countries.map((country) => ({ ...country }));
    this.hideSuggestions();
    if (document.activeElement === this.input) this.updateSuggestions();
  }

  private updateSuggestions(): void {
    const query = this.input.value.trim().toLowerCase();
    if (!query) {
      this.hideSuggestions();
      return;
    }

    this.matches = this.countries
      .filter((c) => c.name.toLowerCase().includes(query))
      .sort((a, b) => a.name.toLowerCase().indexOf(query) - b.name.toLowerCase().indexOf(query))
      .slice(0, 6);
    this.activeIndex = -1;

    if (this.matches.length === 0) {
      this.hideSuggestions();
      return;
    }

    this.suggestionsEl.replaceChildren();
    this.input.removeAttribute("aria-activedescendant");
    this.matches.forEach((country, index) => {
      const el = document.createElement("div");
      el.className = "gralobe-search-item";
      el.id = `${this.suggestionsEl.id}-${index}`;
      el.setAttribute("role", "option");
      el.setAttribute("aria-selected", "false");
      el.textContent = country.name;
      el.addEventListener("mousedown", (e) => {
        e.preventDefault(); // keep focus so blur doesn't fire before click
      });
      el.addEventListener("click", () => {
        this.selectMatch(index);
      });
      this.suggestionsEl.appendChild(el);
    });

    this.suggestionsEl.classList.add("visible");
    this.input.setAttribute("aria-expanded", "true");
  }

  private handleKeydown(e: KeyboardEvent): void {
    if (e.isComposing) return;
    if (e.key === "Escape") {
      e.preventDefault();
      this.hideSuggestions();
      return;
    }

    if (!this.matches.length && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      this.updateSuggestions();
    }
    if (!this.matches.length) {
      if (e.key === "Enter") {
        e.preventDefault();
        this.tryDirectMatch();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      this.activeIndex = Math.min(this.activeIndex + 1, this.matches.length - 1);
      this.highlightActive();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      this.activeIndex = Math.max(this.activeIndex - 1, 0);
      this.highlightActive();
    } else if (e.key === "Enter") {
      e.preventDefault();
      this.selectMatch(this.activeIndex >= 0 ? this.activeIndex : 0);
    }
  }

  private highlightActive(): void {
    this.suggestionsEl.querySelectorAll<HTMLElement>(".gralobe-search-item").forEach((el, i) => {
      el.classList.toggle("active", i === this.activeIndex);
      el.setAttribute("aria-selected", String(i === this.activeIndex));
      if (i === this.activeIndex) this.input.setAttribute("aria-activedescendant", el.id);
    });
  }

  private tryDirectMatch(): void {
    const query = this.input.value.trim().toLowerCase();
    if (!query) return;
    const exact = this.countries.find((c) => c.name.toLowerCase() === query);
    if (exact) {
      this.hideSuggestions();
      this.onSelect(exact.id);
    }
  }

  private selectMatch(index: number): void {
    const match = this.matches[index];
    if (!match) return;
    this.input.value = match.name;
    this.hideSuggestions();
    this.onSelect(match.id);
  }

  private hideSuggestions(): void {
    this.matches = [];
    this.activeIndex = -1;
    this.suggestionsEl.classList.remove("visible");
    this.suggestionsEl.replaceChildren();
    this.input.setAttribute("aria-expanded", "false");
    this.input.removeAttribute("aria-activedescendant");
  }

  dispose(): void {
    clearTimeout(this.blurTimeout);
    this.element.remove();
  }
}
