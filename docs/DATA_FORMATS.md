# Data Formats Guide

## Overview

This guide explains how to structure your statistical data for Gralobe's visualization layers.

## 1. Country-based (Default)

Standard global statistics use ISO 3166-1 Numeric codes.

```json
{
  "840": 120, // USA
  "276": 80 // Germany
}
```

## 2. Region-based (e.g., Districts/States)

Requires a custom TopoJSON configuration (`disableNormalization: true`).
Keys in your data must match the `id` property of the TopoJSON features.

**Example (Germany Districts):**

```json
{
  "08425": 85, // Alb-Donau-Kreis
  "08115": 30 // Böblingen
}
```

## 3. City-based (Points)

For city-level data, use the `MarkerLayer`.
Data should include `lat` and `lng` coordinates.

```typescript
const markers: MarkerData[] = [
  { id: "nyc", lat: 40.71, lng: -74.0, value: 8e6, name: "New York" },
  { id: "ber", lat: 52.52, lng: 13.4, value: 3.6e6, name: "Berlin" },
];
```
