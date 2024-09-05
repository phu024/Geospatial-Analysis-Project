const turf = require('@turf/turf');

// Define the source (point) coordinates
const sourcePoint = {
    lat: 12.685820419231696,
    lng: 101.12518910507909
};

// Define the source (line) coordinates
const sourceLine = [
    {lat: 12.689037508430642, lng: 101.12283611904907},
    {lat: 12.6889851744188, lng: 101.12355495106506},
    {lat: 12.688744437825674, lng: 101.12350130688476},
    {lat: 12.688807238697997, lng: 101.1228790343933},
    {lat: 12.68914217642205, lng: 101.12285757672119},
];

// Define the coordinates of the community area
const communityArea = [
    {lat: 12.689037508430642, lng: 101.12283611904907},
    {lat: 12.6889851744188, lng: 101.12355495106506},
    {lat: 12.688744437825674, lng: 101.12350130688476},
    {lat: 12.688807238697997, lng: 101.1228790343933},
    {lat: 12.68914217642205, lng: 101.12285757672119},
    {lat: 12.688974707615138, lng: 101.12355495106506}
];

// Convert coordinates to GeoJSON format
function convertToGeoJSON(coordinates, type = 'Point') {
    if (type === 'Point') {
        return turf.point([coordinates.lng, coordinates.lat]);
    } else if (type === 'LineString') {
        return turf.lineString(coordinates.map(coord => [coord.lng, coord.lat]));
    } else if (type === 'Polygon') {
        let polygon = coordinates.map(coord => [coord.lng, coord.lat]);
        if (JSON.stringify(polygon[0]) !== JSON.stringify(polygon[polygon.length - 1])) {
            polygon.push(polygon[0]); // Close the polygon
        }
        return turf.polygon([polygon]);
    }
}

// Find center for a line
function findLineCenter(line) {
    return turf.centroid(line);
}

// Set the radius of the buffer (in kilometers)
const radius = 50;

// Create GeoJSON objects
const sourcePointGeoJSON = convertToGeoJSON(sourcePoint, 'Point');
const sourceLineGeoJSON = convertToGeoJSON(sourceLine, 'LineString');
const communityPolygon = convertToGeoJSON(communityArea, 'Polygon');

// Find center for line source
const lineCenterPoint = findLineCenter(sourceLineGeoJSON);

// Create buffers
const pointBuffer = turf.buffer(sourcePointGeoJSON, radius, {units: 'kilometers'});
const lineBuffer = turf.buffer(sourceLineGeoJSON, radius, {units: 'kilometers'});
const lineCenterBuffer = turf.buffer(lineCenterPoint, radius, {units: 'kilometers'});

// Check intersections and containment
function checkRelation(communityArea, buffer, bufferType) {
    const isIntersecting = turf.booleanIntersects(communityArea, buffer);
    const isCompletelyWithin = turf.booleanWithin(communityArea, buffer);

    console.log(`\nFor ${bufferType}:`);
    console.log(`The community area ${isIntersecting ? 'intersects' : 'does not intersect'} with the buffer area`);
    console.log(`The community area is ${isCompletelyWithin ? 'completely within' : 'not completely within'} the buffer area`);
}

console.log("Analysis for point source:");
checkRelation(communityPolygon, pointBuffer, "point buffer");

console.log("\nAnalysis for line source:");
checkRelation(communityPolygon, lineBuffer, "line buffer (entire line)");
checkRelation(communityPolygon, lineCenterBuffer, "line center buffer");

// Compare buffer areas
const lineBufferArea = turf.area(lineBuffer);
const lineCenterBufferArea = turf.area(lineCenterBuffer);

console.log("\nBuffer area comparison:");
console.log(`Line buffer area: ${lineBufferArea.toFixed(2)} square meters`);
console.log(`Line center buffer area: ${lineCenterBufferArea.toFixed(2)} square meters`);
console.log(`Difference: ${Math.abs(lineBufferArea - lineCenterBufferArea).toFixed(2)} square meters`);