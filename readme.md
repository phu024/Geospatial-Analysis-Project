# Geospatial Analysis Project

This project provides tools for geospatial analysis using Turf.js, focusing on buffer creation, intersection checks, and various geometric operations for point and line sources.

## Features

- Convert coordinates to GeoJSON format (Point, LineString, Polygon)
- Create buffers around points and lines
- Find the center point of a line
- Check if areas intersect or are contained within buffers
- Compare different buffer creation methods
- Find points along a line at specified distances

## Prerequisites

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/phu025/geospatial-analysis-project.git
   ```

2. Navigate to the project directory:
   ```
   cd geospatial-analysis-project
   ```

3. Install the required dependencies:
   ```
   npm install @turf/turf
   ```

## Usage

1. Update the `sourcePoint`, `sourceLine`, and `communityArea` variables in the script with your own coordinates.

2. Run the script:
   ```
   node geospatial-analysis.js
   ```

3. The script will output:
   - Analysis results for point source
   - Analysis results for line source (entire line and center point)
   - Comparison of buffer areas

## Main Functions

These are the primary functions created for this project:

### `convertToGeoJSON(coordinates, type)`

Converts coordinates to GeoJSON format.

- `coordinates`: Array of coordinate objects `{lat, lng}` or a single coordinate object for points
- `type`: 'Point', 'LineString', or 'Polygon'
- Returns: GeoJSON object

Example:
```javascript
const point = convertToGeoJSON({lat: 12.34, lng: 56.78}, 'Point');
const line = convertToGeoJSON([{lat: 12.34, lng: 56.78}, {lat: 23.45, lng: 67.89}], 'LineString');
```

### `findLineCenter(line)`

Finds the center point of a line using the centroid method.

- `line`: GeoJSON LineString
- Returns: GeoJSON Point representing the center of the line

Example:
```javascript
const lineCenter = findLineCenter(sourceLineGeoJSON);
```

### `checkRelation(communityArea, buffer, bufferType)`

Checks if the community area intersects with or is contained within the buffer.

- `communityArea`: GeoJSON Polygon of the community area
- `buffer`: GeoJSON Polygon of the buffer area
- `bufferType`: String describing the type of buffer (for logging purposes)

Example:
```javascript
checkRelation(communityPolygon, pointBuffer, "point buffer");
```

## Turf.js Functions Used

These are the main Turf.js functions utilized in this project:

### `turf.buffer(geojson, radius, options)`

Creates a buffer around a point, line, or polygon.

- `geojson`: GeoJSON object (Point, LineString, or Polygon)
- `radius`: Number representing the distance of the buffer
- `options`: Object with properties like `units` (e.g., 'kilometers')
- Returns: GeoJSON Polygon or MultiPolygon representing the buffer

Example:
```javascript
const buffer = turf.buffer(sourcePointGeoJSON, 50, {units: 'kilometers'});
```

### `turf.booleanIntersects(feature1, feature2)`

Checks if two geometries intersect.

- `feature1`, `feature2`: GeoJSON objects
- Returns: Boolean indicating whether the geometries intersect

Example:
```javascript
const isIntersecting = turf.booleanIntersects(communityPolygon, buffer);
```

### `turf.booleanWithin(feature1, feature2)`

Checks if the first geometry is completely within the second geometry.

- `feature1`, `feature2`: GeoJSON objects
- Returns: Boolean indicating whether feature1 is within feature2

Example:
```javascript
const isCompletelyWithin = turf.booleanWithin(communityPolygon, buffer);
```

### `turf.area(geojson)`

Calculates the area of a polygon.

- `geojson`: GeoJSON Polygon or MultiPolygon
- Returns: Number representing the area in square meters

Example:
```javascript
const bufferArea = turf.area(buffer);
```

## Buffer Types

1. Point Buffer: Created around a single point
2. Line Buffer: Created around the entire line
3. Line Center Buffer: Created around the center point of the line

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## References
You can find more information about Turf.js and its functions at [Turf.js Documentation](https://turfjs.org).


